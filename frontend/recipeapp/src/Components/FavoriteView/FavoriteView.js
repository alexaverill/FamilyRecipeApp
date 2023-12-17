import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { QueryRecipes } from "../../API/RecipeApi";
import RecipeCard from "../RecipeCard/RecipeCard";
import { GetCollection } from "../../API/CollectionApi";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../UserContext/UserContext";
export default function FavoriteView() {
    const {favorites} = useContext(UserContext);
    const {collectionId} = useParams();
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getRecipes();
    }, []);
    const getRecipes = async () => {
        setLoading(true);
        if(!favorites){return;}
        let ids = favorites.map((fav)=>{return {recipeId:fav}});
        console.log(ids);
        let data = await QueryRecipes({ recipes: ids });
        setRecipes(data);
        setLoading(false);
    };
    let recipeDisplay = recipes?.map((recipe) => {
        return <RecipeCard recipe={recipe} favorited={favorites.includes(recipe.recipeId)}/>; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
    })
    if (loading) {
        return (
            <div className="content">
                <CircularProgress />
            </div>
        )
    }
    return (
        <div className="content">
            <div className="recipeHeader">
                <div>
                    <h1>Favorites</h1>
                </div>
            </div>
            <div className="recipeGrid">
                {recipeDisplay}
            </div>
        </div>
    )
}