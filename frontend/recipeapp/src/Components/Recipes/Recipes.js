import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Recipes.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import RecipeCard from "../RecipeCard/RecipeCard";
import { UserContext } from "../UserContext/UserContext";
import { GetRecipes } from "../../API/RecipeApi";
export default function Recipes() {
    const { user, favorites } = useContext(UserContext)
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        LoadRecipes();
    }, [])
    const LoadRecipes = async () => {
        setIsLoading(true);
        let data = await GetRecipes();
        if (data) {
            setRecipes(data);
            setFiltered(data);
        }
        setIsLoading(false);
    }
    let recipeDisplay = filteredRecipes?.map((recipe) => {
        if (favorites?.length > 0 && favorites?.find((fav) => {
            return fav === recipe.recipeId
        })) {
            return <RecipeCard recipe={recipe} key={recipe.recipeId} favorited={true} />;
        }
        return <RecipeCard recipe={recipe} key={recipe.recipeId} favorited={false} />; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
    })
    const filterRecipes = (e) => {
        if (e.length > 1) {
            let filtered = recipes.filter(recipe => recipe.title.includes(e) || recipe.description.includes(e));
            setFiltered(filtered);
        }
        if (e.length == 0) {
            setFiltered(recipes);
        }
    }
    return (
        <div className="content">
            <div className="recipeHeader">
                <div>
                    <h1>Our Cookbook</h1>
                </div>
                <div className="search-and-add">
                    <TextField size="small" label="Search" onChange={(e) => filterRecipes(e.target.value)}></TextField>
                    <Link component="button" to="/create" className="recipeLinkButton">Add Recipe</Link>
                </div>
            </div>
            <div className="recipeGrid">
                {isLoading ? <CircularProgress /> : recipeDisplay}
            </div>
        </div>
    )
}