import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Recipes.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import RecipeCard from "../RecipeCard/RecipeCard";
import { UserContext } from "../UserContext/UserContext";
export default function Recipes() {
    const {favorites: userData} = useContext(UserContext)
    const [recipes, setRecipes] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    console.log(userData);
    useEffect(() => {
        LoadRecipes();
    }, [])
    const LoadRecipes = async () => {
        setIsLoading(true);
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
        if (data) {
            setRecipes(data);
        }
        setIsLoading(false);
    }
    let recipeDisplay = recipes?.map((recipe) => {
        if(userData?.favorites?.find((fav)=> { 
            console.log(fav); 
            return fav === recipe.recipeId
        })){
            return <RecipeCard recipe={recipe} key={recipe.recipeId} favorited={true}/>; 
        }
        return <RecipeCard recipe={recipe} key={recipe.recipeId} favorited={false} />; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
    })
    return (
        <div className="content">
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
               {isLoading?<CircularProgress />: recipeDisplay}
            </div>
        </div>
    )
}