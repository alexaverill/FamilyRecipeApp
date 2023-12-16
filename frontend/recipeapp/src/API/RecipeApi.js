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