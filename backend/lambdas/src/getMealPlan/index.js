import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
  try {
    const command = new GetCommand({
      TableName: "MealPlans",
      Key: {
        planId: `${event.pathParameters.planId.toString()}`,
      },
    });

    const response = await docClient.send(command);
    let plan = response.Item;
    return {
      statusCode: 200,
      body: JSON.stringify(plan),
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
