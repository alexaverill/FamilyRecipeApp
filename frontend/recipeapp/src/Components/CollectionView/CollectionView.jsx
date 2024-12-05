import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { QueryRecipes } from "../../API/RecipeApi";
import RecipeCard from "../RecipeCard/RecipeCard";
import { GetCollection } from "../../API/CollectionApi";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../UserContext/UserContext";
export default function CollectionsView() {
    const {favorites} = useContext(UserContext);
    const {collectionId} = useParams();
    const location = useLocation();
    const [collection,setCollection] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (location.state !=null) {
            let collection = location.state.collection;
            let ids = collection.recipes?.length >0 ? collection.recipes?.map((recipe) => { return { recipeId: recipe.recipeId } }) : undefined;
            setCollection(location.state.collection);
            getRecipes(ids);
        } else {
            console.log("Loading collections");
            loadCollection();
        }
    }, []);
    const loadCollection = async () => {
        setLoading(true);
        let collection = await GetCollection(collectionId);
        setCollection(collection);
        let ids = collection.recipes?.length >0 ? collection.recipes?.map((recipe) => { return { recipeId: recipe.recipeId } }) : undefined;
        await getRecipes(ids);
        setLoading(false);
    }
    const getRecipes = async (ids) => {
        if(!ids){return;}
        setLoading(true);
        let data = await QueryRecipes({ recipes: ids });
        setRecipes(data);
        setLoading(false);
    };
    let recipeDisplay = recipes?.map((recipe) => {
        return <RecipeCard recipe={recipe} favorited={favorites?.includes(recipe.recipeId)}/>; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
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
                    <h1>{collection.name}</h1>
                </div>
            </div>
            <div className="recipeGrid">
                {recipeDisplay}
            </div>
        </div>
    )
}