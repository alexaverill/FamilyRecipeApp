export async function GetCollections(){
    let url = '/get-collections';
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "GET",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function GetCollection(collectionId){
    let url = '/get-collection/'+collectionId;
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "GET",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function AddToCollection(recipe,collection){
    let url = '/add-to-collections';
   return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({recipe,collection}),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function RemoveFromCollection(recipe,collection){
    let url = '/remove-from-collections';
   return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({recipe,collection}),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}