
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand,PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    let parsedEvent = JSON.parse(event.body);
    try{
      const command = new GetCommand({
        TableName: "RecipeUsers",
        Key:{
            userId:`${parsedEvent.user.userId.toString()}`,
            username:`${parsedEvent.user.username}`
        }
    });

    const response = await docClient.send(command);
    let user= response.Item;
    if(!user.favorites){
      user.favorites = [parsedEvent.recipeId];
      updateUser(user);
    }else{
      if(!user.favorites.find(fav=>fav === parsedEvent.recipeId)){
        user.favorites.push(parsedEvent.recipeId);
        updateUser(user);
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
const updateUser = async (user)=>{
  try {
    const command = new PutCommand({
        TableName: "RecipeUsers",
        //ConditionExpression: "attribute_not_exists(eventId)",
        Item: user
      });
    
      const response = await docClient.send(command,{removeUndefinedValues:true});
  } catch (error) {
    console.log(error);
  } 
}

