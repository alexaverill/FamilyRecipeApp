
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand,PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  //recipeid title
  //collectionid name
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    let parsedEvent = JSON.parse(event.body);
    let parsedRecipe = parsedEvent.recipe;
    console.log("ppr");
    console.log(parsedRecipe);
    const collection = parsedEvent.collection;
    try{
      const command = new GetCommand({
        TableName: "Recipes",
        Key:{
            recipeId:`${parsedRecipe.recipeId.toString()}`
        }
    });

    const response = await docClient.send(command);
    let recipe= response.Item;
    if(!recipe.collections){
      recipe.collections = [collection];
      updateRecipe(recipe);
    }else{
      if(!recipe.collections.find(col=>col.collectionId === collection.collectionId)){
        recipe.collections.push(collection);
        updateRecipe(recipe);
      }
    }
    }catch(e){
      console.log(e);
    }
      try{
        const getCollectionCommand  = new GetCommand({
          TableName: "RecipeCollections",
          Key:{
              collectionId:`${collection.collectionId.toString()}`
          }
          
      });
      const collectionResponse = await docClient.send(getCollectionCommand);

      let collectionItem = collectionResponse.Item;
            console.log("cr:");
      console.log(collectionItem);
      if(!collectionItem.recipes){
        let recipes = [{recipeId:parsedRecipe.recipeId,title:parsedRecipe.title}];
        collectionItem.recipes = recipes;
        updateCollection(collectionItem);
      }else{
        if(!collectionItem.recipes.find(recipe=>recipe.recipeId == parsedRecipe.recipeId)){
         collectionItem.recipes.push({recipeId:parsedRecipe.recipeId,title:parsedRecipe.title})
         console.log("Updating Collection");
          updateCollection(collectionItem);
        }
      }
      }catch(e){
        console.log(e);
      }
    
    
    return {
        statusCode: 200,
        body: JSON.stringify({...parsedEvent}),
        headers : {
          'Access-Control-Allow-Origin': '*'
      }
      }
};
const updateRecipe = async (recipe)=>{
  try {
    const command = new PutCommand({
        TableName: "Recipes",
        //ConditionExpression: "attribute_not_exists(eventId)",
        Item: recipe
      });
    
      const response = await docClient.send(command,{removeUndefinedValues:true});
  } catch (error) {
    console.log(error);
  } 
}
const updateCollection = async (collection)=>{
  console.log("New Collection");
  console.log(collection);
  const command = new PutCommand({
    TableName: "RecipeCollections",
    //ConditionExpression: "attribute_not_exists(eventId)",
    Item: collection
  });

  const response = await docClient.send(command,{removeUndefinedValues:true});
}