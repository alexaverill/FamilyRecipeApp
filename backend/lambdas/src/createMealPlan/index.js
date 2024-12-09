import { randomUUID } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { parse } from "path";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  let parsedEvent = JSON.parse(event.body);
  if (!parsedEvent.planId) {
    parsedEvent.planId = randomUUID();
    parsedEvent.creationDate = Date.now();
    parsedEvent.updatedDate = Date.now();
  } else {
    parsedEvent.updatedDate = Date.now();
  }
  if (parsedEvent.userId) {
    parsedEvent.userId = parsedEvent.userId.toString();
  }

  try {
    const command = new PutCommand({
      TableName: "MealPlans",
      //ConditionExpression: "attribute_not_exists(eventId)",
      Item: parsedEvent,
    });

    const response = await docClient.send(command, {
      removeUndefinedValues: true,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ ...parsedEvent }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.log(error);
    //throw error
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
