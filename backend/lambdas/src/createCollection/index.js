
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    let parsedEvent = JSON.parse(event.body);
    if(!parsedEvent.collectionId){
        parsedEvent.collectionId = randomUUID();
    }
    try {
        const command = new PutCommand({
            TableName: "RecipeCollections",
            //ConditionExpression: "attribute_not_exists(eventId)",
            Item: parsedEvent
          });
        
          const response = await docClient.send(command);
          console.log(response);
      } catch (error) {
        console.log(error);
        //throw error
        return {
          statusCode:500,
          body:JSON.stringify(error)
        };
      } 
    
    return {
        statusCode: 200,
        body: JSON.stringify({...parsedEvent}),
        headers : {
          'Access-Control-Allow-Origin': '*'
      }
      }
};