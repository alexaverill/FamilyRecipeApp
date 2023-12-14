
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand,PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    let parsedEvent = JSON.parse(event.body);
    if(!parsedEvent.recipeId){
        parsedEvent.recipeId = randomUUID();
    }
    parsedEvent.userId = parsedEvent.userId.toString();
    try {
        const command = new PutCommand({
            TableName: "Recipes",
            //ConditionExpression: "attribute_not_exists(eventId)",
            Item: parsedEvent
          });
        
          const response = await docClient.send(command,{removeUndefinedValues:true});
          console.log(response);
      } catch (error) {
        console.log(error);
        //throw error
        return {
          statusCode:500,
          body:JSON.stringify(error)
        };
      } 
    //add to collection array if it doesn't exist
    console.log(parsedEvent.collections);
    for(let collection of parsedEvent.collections){
      if(collection.length<=0){ continue;}
      try{
        const getCollectionCommand  = new GetCommand({
          TableName: "RecipeCollections",
          Key:{
              collectionId:`${collection.collectionId.toString()}`
          }
          
      });
      const collectionResponse = await docClient.send(getCollectionCommand);
      console.log(collectionResponse);
      let collectionItem = collectionResponse.Item;
      if(!collectionItem.recipes){
        let recipes = [{recipeId:parsedEvent.recipeId,title:parsedEvent.title}];
        collectionItem.recipes = recipes;
        updateCollection(collectionItem);
      }else{
        if(!collectionItem.recipes.includes(recipe=>recipe.recipeId === parsedEvent.recipeId)){
         collectionItem.recipes.push({recipeId:parsedEvent.recipeId,title:parsedEvent.title})
          updateCollection(collectionItem);
        }
      }
      }catch(e){
        console.log(e);
      }
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({...parsedEvent}),
        headers : {
          'Access-Control-Allow-Origin': '*'
      }
      }
};
const updateCollection = async (collection)=>{
  console.log("New Collection");
  console.log(collection);
  const command = new PutCommand({
    TableName: "RecipeCollections",
    //ConditionExpression: "attribute_not_exists(eventId)",
    Item: collection
  });

  const response = await docClient.send(command,{removeUndefinedValues:true});
  console.log(response);
}