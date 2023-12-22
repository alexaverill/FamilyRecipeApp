
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
    let comment = parsedEvent.comment;
    if(!comment.commentId ){
      comment.commentId = randomUUID();
    }
    let recipeId = parsedEvent.recipeId;
    console.log(parsedEvent);
    try{
      const command = new GetCommand({
        TableName: "Recipes",
        Key:{
            recipeId:`${recipeId.toString()}`
        }
    });

    const response = await docClient.send(command);
    let recipe= response.Item;
    if(!recipe.comments){
      recipe.comments = [comment];
      updateRecipe(recipe);
    }else{
      if(!recipe.comments.find(com=>com.commentId === comment.commentId)){
        recipe.comments.push(comment);
        updateRecipe(recipe);
      }
    }
    }catch(e){
      console.log(e);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(comment),
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