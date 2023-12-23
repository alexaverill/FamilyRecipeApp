import { Button, CircularProgress, fabClasses } from "@mui/material";
import classes from './FavoriteButton.module.css'
import { useContext, useEffect, useState } from "react";
import {UserContext} from '../UserContext/UserContext'
import { FavoriteRecipe, RemoveFavorites } from "../../API/RecipeApi";
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
export default function FavoriteButton({favorited,recipeId}){
    const [favorite, setFavorited] = useState(favorited);
    const {AddFavorite,RemoveFavorite} = useContext(UserContext);
    const [loading,setLoading] = useState(false);
    const {user} = useContext(UserContext);
    useEffect(()=>{setFavorited(favorited)},[favorited])
    const handleFavorite = async ()=>{
        let eventObj = {
            user,
            recipeId
        }
        console.log(eventObj);
        setLoading(true);
        let data = await FavoriteRecipe(eventObj);
        AddFavorite(recipeId);
        setFavorited(true);
        setLoading(false);
    };
    const handleUnFavorite = async () => {
        let eventObj = {
            user,
            recipeId
        }
        console.log(eventObj);
        setLoading(true);
        let data = await RemoveFavorites(eventObj);
        RemoveFavorite(recipeId);
        setFavorited(false);
        setLoading(false);
    };
    if(favorite){
        return (
            <Button onClick={handleUnFavorite}>{loading?<CircularProgress/>:<FavoriteIcon/>}</Button>
        )
    }
    return(
        <Button className={classes.favbutton} onClick={handleFavorite}>{loading?<CircularProgress/>:<FavoriteBorderIcon/>}</Button>

    )
}