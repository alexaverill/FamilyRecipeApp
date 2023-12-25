import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
  console.log(event);
  const command =new ScanCommand({
      TableName:"RecipeUsers",
      IndexName:"usernameIndex",
  });
  //TODO filter by date/Active
  
    const response = await docClient.send(command);
    console.log(response);
    const users = response?.Items;
  return {
      statusCode: 200,
      body: JSON.stringify(users),
      headers : {
        'Access-Control-Allow-Origin': '*',
    }
    }
};