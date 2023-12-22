export async function QueryRecipes(eventObj){
    let url = '/query-recipes';
   return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function GetRecipes(){
    let url = '/get-recipes'
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
export async function FavoriteRecipe(eventObj){
    let url = '/add-favorite';
    return await fetch(process.env.REACT_APP_API_URL + url, {
         method: "POST",
         headers: {
             //'Authorization':`Bearer ${token}`,
             "Content-Type": "application/json",
         },
         body: JSON.stringify(eventObj),
     })
         .then((response) => response.json())
         .catch((err) => {
             console.log(err);
             console.log(err.message);
         });
}
export async function GetFavorites(eventObj){
    let url = '/get-favorites';
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function RemoveFavorites(eventObj){
    let url = '/remove-favorites';
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function CreateRecipe(eventObj){
    let url = '/create-recipe'
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function DeleteRecipe(recipeId){
    let url = '/delete-recipe/'+recipeId
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "DELETE",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function GetRecipe(recipeId){
    let url = '/get-recipe/' + recipeId;
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
export async function AddComment(eventObj){
    let url = '/add-comment'
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}
export async function RemoveComment(eventObj){
    let url = '/remove-comment'
    return await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        headers: {
            //'Authorization':`Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
}