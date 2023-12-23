import { genericApiCall } from "./BaseApi";

export async function QueryRecipes(eventObj){
    let url = '/query-recipes';
    return await genericApiCall(url,"POST",eventObj);
}
export async function GetRecipes(){
    let url = '/get-recipes'
    return await genericApiCall(url,"GET",null);
}
export async function FavoriteRecipe(eventObj){
    let url = '/add-favorite';
    return await genericApiCall(url,"POST",eventObj);
}
export async function GetFavorites(eventObj){
    let url = '/get-favorites';
    return await genericApiCall(url,"POST",eventObj);
}
export async function RemoveFavorites(eventObj){
    let url = '/remove-favorites';
    return await genericApiCall(url,"POST",eventObj);
}
export async function CreateRecipe(eventObj){
    let url = '/create-recipe'
    return await genericApiCall(url,"POST",eventObj);
}
export async function DeleteRecipe(recipeId){
    let url = '/delete-recipe/'+recipeId
    return await genericApiCall(url,"DELETE",null);
}
export async function GetRecipe(recipeId){
    let url = '/get-recipe/' + recipeId;
    return await genericApiCall(url,"GET",null);
}
export async function AddComment(eventObj){
    let url = '/add-comment'
    return await genericApiCall(url,"POST",eventObj);
}
export async function RemoveComment(eventObj){
    let url = '/remove-comment'
    return await genericApiCall(url,"POST",eventObj);
}