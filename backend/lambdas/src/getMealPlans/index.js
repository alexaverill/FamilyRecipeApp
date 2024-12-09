import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  console.log(event);
  const parsedEvent = JSON.parse(event.body);
  try {
    const command = new QueryCommand({
      TableName: "MealPlans",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId=:e",
      ExpressionAttributeValues: {
        ":e": { S: `${parsedEvent.userId.toString()}` },
      },
    });
    const response = await docClient.send(command);
    console.log(response);
    let plans = response.Items.map((item) => {
      return unmarshall(item);
    });
    return {
      statusCode: 200,
      body: JSON.stringify(plans),
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
