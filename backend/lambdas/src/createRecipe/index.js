
import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { parse } from 'path';
const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  let parsedEvent = JSON.parse(event.body);
  let shouldLinkToParent = false;
  if (!parsedEvent.recipeId) {
    parsedEvent.recipeId = randomUUID();
    //new recipe check if we have a parentId to linkt to this recipe. 
    if (parsedEvent.parentId) {
      shouldLinkToParent = true;
    }
  }
  if(parsedEvent.userId){
    parsedEvent.userId = parsedEvent.userId.toString();
  }
  try {
    const command = new PutCommand({
      TableName: "Recipes",
      //ConditionExpression: "attribute_not_exists(eventId)",
      Item: parsedEvent
    });

    const response = await docClient.send(command, { removeUndefinedValues: true });
    console.log(response);
  } catch (error) {
    console.log(error);
    //throw error
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
  //link to parent now that its saved. 
  if (shouldLinkToParent) {
    await AddChildToParent(parsedEvent.parentId,parsedEvent.recipeId);
  }
  //add to collection array if it doesn't exist
  console.log(parsedEvent.collections);
  if (parsedEvent.collections?.length > 0) {
    for (let collection of parsedEvent.collections) {
      if (collection.length <= 0) { continue; }
      try {
        const getCollectionCommand = new GetCommand({
          TableName: "RecipeCollections",
          Key: {
            collectionId: `${collection.collectionId.toString()}`
          }

        });
        const collectionResponse = await docClient.send(getCollectionCommand);
        console.log(collectionResponse);
        let collectionItem = collectionResponse.Item;
        if (!collectionItem.recipes) {
          let recipes = [{ recipeId: parsedEvent.recipeId, title: parsedEvent.title }];
          collectionItem.recipes = recipes;
          updateCollection(collectionItem);
        } else {
          if (!collectionItem.recipes.includes(recipe => recipe.recipeId === parsedEvent.recipeId)) {
            collectionItem.recipes.push({ recipeId: parsedEvent.recipeId, title: parsedEvent.title })
            updateCollection(collectionItem);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ...parsedEvent }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
const updateCollection = async (collection) => {
  console.log("New Collection");
  console.log(collection);
  const command = new PutCommand({
    TableName: "RecipeCollections",
    //ConditionExpression: "attribute_not_exists(eventId)",
    Item: collection
  });

  const response = await docClient.send(command, { removeUndefinedValues: true });
  console.log(response);
}
const AddChildToParent = async (parentId,recipeId) =>{
  try {
    const getParent = new GetCommand({
      TableName: "Recipes",
      Key: {
        recipeId: parentId
      }
    });
    console.log(`Parentid: ${parentId}`);
    const parent = await docClient.send(getParent);
    let recipe = parent.Item;
    if(recipe.children){
      recipe.children = [...recipe.children,recipeId];
    }else{
      recipe.children = [recipeId];
    }
    console.log(recipe);
    const command = new PutCommand({
      TableName: "Recipes",
      Item: recipe
    });

    const response = await docClient.send(command);
    console.log(response);
  }catch(e){
    console.log(e);
  }
}