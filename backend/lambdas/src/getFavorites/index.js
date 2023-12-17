import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
    console.log(event);
    const parsedEvent = JSON.parse(event.body);
    try {
        const command = new GetCommand({
            TableName: "RecipeUsers",
            Key:{
                userId:`${parsedEvent.userId.toString()}`,
                username:`${parsedEvent.username}`
            }
        });

        const response = await docClient.send(command);
        let favorites = response.Item;
        return {
            statusCode: 200,
            body: JSON.stringify(favorites),
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e),
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
    }

};


