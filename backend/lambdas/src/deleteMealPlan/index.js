import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
  console.log(event);
  try {
    const command = new DeleteCommand({
      TableName: "MealPlans",
      Key: {
        planId: `${event.pathParameters.planId.toString()}`,
      },
    });

    const response = await docClient.send(command);
    let recipes = response.Item;
    console.log(recipes);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
