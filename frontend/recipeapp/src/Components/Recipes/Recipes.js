import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Recipes.css";
import { Button, TextField } from "@mui/material";
import RecipeCard from "../RecipeCard/RecipeCard";
export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        LoadRecipes();
    }, [])
    const LoadRecipes = async () => {
        let url = '/get-recipes'
        let data = await fetch(process.env.REACT_APP_API_URL + url, {
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
        console.log(data);
        if (data) {
            setRecipes(data);
        }
    }
    let recipeDisplay = recipes?.map((recipe) => {
        return <RecipeCard recipe={recipe} />; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
    })
    return (
        <div class="content">
            <div className="recipeHeader">
                <div>
                    <h1>Our Cookbook</h1>
                </div>
                <div className="search-and-add">
                    <TextField size="small" label="Search"></TextField>
                    <Link component="button" to="/create" className="recipeLinkButton">Add Recipe</Link>
                </div>
            </div>
            <div className="recipeGrid">
                {recipeDisplay}
            </div>
        </div>
    )
}