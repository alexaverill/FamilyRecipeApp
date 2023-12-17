import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import classes from "./RecipeView.module.css"
import { Button, CircularProgress,Chip } from "@mui/material";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { RemoveFromCollection, AddToCollection } from "../../API/CollectionApi";
import CollectionRow from "../CollectionRow/CollectionRow";
import { UserContext } from "../UserContext/UserContext";
export default function RecipeView() {
    const {favorites} = useContext(UserContext);
    const {recipeId} = useParams();
    const location = useLocation();
    const [recipe, setRecipe] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const [collections,setCollections] = useState([]);
    const [isFavorited,setIsFavorited] = useState(false);

    let displaySteps = recipe.steps?.map((steps) => {

        return <li>{steps}</li>
    });
    let displayIngredients = recipe.ingredients?.map((ingredient) => {
        return <li>{ingredient}</li>
    })
    const loadRecipe = async() =>{
        setIsLoading(true);
        let url = '/get-recipe/'+recipeId;
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
            setRecipe(data);
            setCollections(data.collections)
        }
        setIsLoading(false);
    }
    useEffect(() => {
        if (!location.state) {
            loadRecipe();
        } else {
            setRecipe(location.state.recipe);
            setCollections(location.state.recipe.collections);
        }
        
    }, []);
    useEffect(()=>{
        console.log(favorites);
        let value = favorites.includes(recipe.recipeId)
        console.log(value);
        setIsFavorited(value);
        console.log(isFavorited)
    },[favorites])
    if(isLoading){
        return (<div className="content">
            <div className="twoColumn">
            <CircularProgress/>
            </div>
        </div>)
    }
    const handleDelete = async (collectionId, name) => {
        console.log(collectionId);
        let collectionObj = { collectionId, name };
        let recipeObj = { recipeId:recipe.recipeId, title:recipe.title };
        await RemoveFromCollection(recipeObj, collectionObj)
        collections.splice(collections.findIndex(c => c.collectionId == collectionId), 1);
        setCollections([...collections]);
    }
    const addCollection = async (collection) => {
        if(collections.find(col=>col.collectionId === collection.collectionId)){
            return;
        }
        let collectionObj = { collectionId: collection.collectionId, name: collection.name };
        let recipeObj = { recipeId:recipe.recipeId, title:recipe.title };
        await AddToCollection(recipeObj, collectionObj)
        setCollections([...collections,collectionObj]);
    }
    let collectionList = collections?.map((collection) => {
        return <Chip label={collection.name} onDelete={() => handleDelete(collection.collectionId)} />;
    }
    );
    return (
        <div className="content">
            <div className="twoColumn">
                <div className={classes.image}><img src="/placeholder_1.png" /></div>
                <div className='recipes'>
                    <div className={classes.titleRow}>
                        <div className="recipeTitle">{recipe.title}</div>
                        <div className={classes.actions}>
                            <Link component="button" className={classes.editLink} to={'edit'} state={{recipe}}><img className={classes.editImg} src="/edit.png" /></Link>
                            <Button><img src="/download.png" /></Button>
                            <FavoriteButton favorited={isFavorited}/>
                            <Link component="button" to="/create" state={{recipe,variation:true}}className="recipeLinkButton">Add Variation</Link>
                        </div>
                    </div>
                    <div className='leftAlign descriptionRow'>
                        {recipe.description}
                    </div>
                    <div className={classes.collections}>
                        {collectionList} <CollectionRow collectionAdded={addCollection} />
                    </div>
                    <div>
                        <h2>Ingredients</h2>
                        <ul className={classes.list}>
                            {displayIngredients}
                        </ul>
                    </div>
                    <div>
                        <h2>Steps</h2>
                        <ol className={classes.list}>
                            {displaySteps}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}