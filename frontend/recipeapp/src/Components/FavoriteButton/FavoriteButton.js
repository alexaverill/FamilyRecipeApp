import { Button, fabClasses } from "@mui/material";

export default function FavoriteButton({favorited}){
    if(favorited){
        return (
            <Button><img src="/favorited.png"/></Button>
        )
    }
    return(
        <Button><img src="/favorite.png"/></Button>

    )
}