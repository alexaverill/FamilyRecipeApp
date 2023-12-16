import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
  console.log(event);
  let parsedEvent = JSON.parse(event.body);
  const command =new BatchGetCommand({
    RequestItems:{
      Recipes:{
          Keys:parsedEvent.recipes
      }
    }
  });
  //TODO filter by date/Active
  
    const response = await docClient.send(command);
    console.log(response);
    const recipes = response?.Responses.Recipes;
  return {
      statusCode: 200,
      body: JSON.stringify(recipes),
      headers : {
        'Access-Control-Allow-Origin': '*',
    }
    }
};