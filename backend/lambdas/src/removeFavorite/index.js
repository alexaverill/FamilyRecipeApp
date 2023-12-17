
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  //recipeid title
  //collectionid name
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  let parsedEvent = JSON.parse(event.body);
  console.log(parsedEvent);
  try {
    const command = new GetCommand({
      TableName: "RecipeUsers",
      Key:{
          userId:`${parsedEvent.user.userId.toString()}`,
          username:`${parsedEvent.user.username}`
      }
  });

    const response = await docClient.send(command);
    let user = response.Item;
    let userIndex = user.favorites.findIndex(favorite => favorite === parsedEvent.recipeId)

    if (userIndex >= 0) {
      user.favorites.splice(userIndex, 1);
      updateUser(user);
    }
  } catch (e) {
    console.log(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ...parsedEvent }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
const updateUser = async (user) => {
  try {
    const command = new PutCommand({
      TableName: "RecipeUsers",
      //ConditionExpression: "attribute_not_exists(eventId)",
      Item: user
    });

    const response = await docClient.send(command, { removeUndefinedValues: true });
  } catch (error) {
    console.log(error);
  }
}
