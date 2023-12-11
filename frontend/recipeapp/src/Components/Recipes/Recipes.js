import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
export default function Recipes(){
    const [recipes,setRecipes] = useState([]);
    useEffect(()=>{
        LoadRecipes();
    },[])
    const LoadRecipes = async ()=>{
        let url='/get-recipes'
        let data = await fetch(process.env.REACT_APP_API_URL+url, {
            method: "GET",
            headers:{
             //'Authorization':`Bearer ${token}`,
             "Content-Type": "application/json",
            }
            })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err);
               console.log(err.message);
            });  
        console.log(data);
        if(data){
            setRecipes(data);
        }
    }
    let recipeDisplay = recipes?.map((recipe)=>{
        return <div><Link to={'/recipe/'+recipe.recipeId} state={{recipe}}>{recipe.title}</Link></div>;
    })
    return (
        <>
        <h1>Recipes</h1>
        {recipeDisplay}
        </>
    )
}