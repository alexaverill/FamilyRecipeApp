import { genericApiCall } from "./BaseApi";

export async function GetCollections(){
    let url = '/get-collections';
    return await genericApiCall(url,"GET",null);
}
export async function GetCollection(collectionId){
    let url = '/get-collection/'+collectionId;
    return await genericApiCall(url,"GET",null);
}
export async function AddToCollection(recipe,collection){
    let url = '/add-to-collections';
    return await genericApiCall(url,"POST",{recipe,collection});
}
export async function RemoveFromCollection(recipe,collection){
    let url = '/remove-from-collections';
    return await genericApiCall(url,"POST",{recipe,collection});
}
export async function CreateCollection(collection){
    let url = '/create-collection';
    return await genericApiCall(url,"POST",collection);
}