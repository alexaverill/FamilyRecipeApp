import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);
export const handler = async (event, context) => {
    console.log(event);
    try {
        const getRecipe = new GetCommand({
            TableName: "Recipes",
            Key:{
                recipeId:`${event.pathParameters.recipeId.toString()}`
            }
        });

        const recipeResponse = await docClient.send(getRecipe);
        let recipe = recipeResponse.Item;
        if(recipe.parentId){
            await removeRecipeIdFromParent(recipe.parentId,recipe.recipeId);
        }
        const command = new DeleteCommand({
            TableName: "Recipes",
            Key:{
                recipeId:`${event.pathParameters.recipeId.toString()}`
            }
        });

        const response = await docClient.send(command);
        let recipes = response.Item;
        console.log(recipes);
        return {
            statusCode: 200,
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
removeRecipeIdFromParent = async (parentId,recipeId) =>{
    const getParent = new GetCommand({
        TableName: "Recipes",
        Key:{
            recipeId:`${parentId}`
        }
    });

    const parentRecipe = await docClient.send(getParent);
    let recipe = parentRecipe.Item;
    let childIndex = recipe.children?.findIndex(child => child === recipeId)

    if (childIndex >= 0) {
      recipe.children.splice(childIndex, 1);
      console.log(recipe);
      const command = new PutCommand({
        TableName: "Recipes",
        Item: recipe
      });
  
      const response = await docClient.send(command);
      console.log(response);
    }
}

