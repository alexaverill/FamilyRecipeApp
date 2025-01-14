import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  console.log(event);
  const parsedEvent = JSON.parse(event.body);
  try {
    const command = new ScanCommand({
      TableName: "MealPlans",
      IndexName: "UserIdIndex",
    });
    const response = await docClient.send(command);
    console.log(response);
    console.log(parsedEvent.userId);
    let myPlans = response.Items.filter(
      (item) => item.userId === parsedEvent.userId
    );
    let sharedPlans = response.Items.filter((item) =>
      item.shared.find((entry) => entry === parsedEvent.userId)
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ plans: myPlans, shared: sharedPlans }),
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
