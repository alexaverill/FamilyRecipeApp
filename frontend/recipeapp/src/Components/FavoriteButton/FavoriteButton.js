import { Button, fabClasses } from "@mui/material";
import classes from './FavoriteButton.module.css'
import { useContext, useState } from "react";
import {UserContext} from '../UserContext/UserContext'
import { FavoriteRecipe, RemoveFavorites } from "../../API/RecipeApi";
export default function FavoriteButton({favorited,recipeId}){
    const [favorite, setFavorited] = useState(favorited);
    const {AddFavorite,RemoveFavorite} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const handleFavorite = async ()=>{
        let eventObj = {
            user,
            recipeId
        }
        console.log(eventObj);
        let data = await FavoriteRecipe(eventObj);
        console.log(data);
        AddFavorite(recipeId);
        setFavorited(true);
    };
    const handleUnFavorite = async () => {
        let eventObj = {
            user,
            recipeId
        }
        console.log(eventObj);
        let data = await RemoveFavorites(eventObj);
        console.log(data);
        RemoveFavorite(recipeId);
        setFavorited(false);
    };
    if(favorite){
        return (
            <Button onClick={handleUnFavorite}><img src="/favorited.png"/></Button>
        )
    }
    return(
        <Button className={classes.favbutton} onClick={handleFavorite}><img src="/favorite.png"/></Button>

    )
}