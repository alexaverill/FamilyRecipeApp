import { useNavigate } from "react-router-dom"
import { Chip } from "@mui/material";
import classes from "./RecipeCard.module.css"
import FavoriteButton from "../FavoriteButton/FavoriteButton";
export default function RecipeCard({ recipe,favorited }) {
    const navigate = useNavigate();
    const collectionPills = recipe.collections?.map(collection => {
        return <Chip className={classes.chip} label={collection.name} key={collection.collectionId} href={`/collections/${collection.collectionId}`}/>
    })
    return (
        <div className={classes.card}>
            <div className={classes.clickableCard} onClick={() => navigate('/recipe/' + recipe.recipeId, { state: { recipe } })}>
                <div className={classes.cardImg}>
                    <img className={classes.img} src="/images/one.svg"/>
                </div>
                <div className={classes.cardContent}>
                    <div className={classes.textContent}>
                        <div className={classes.cardTitle}>{recipe.title}</div>
                        <div className={classes.subtitle}>
                            <div>Contributed by {recipe.user?.username}</div>
                        </div>
                        <div className={classes.cardDesc}>
                            {recipe.description}
                        </div>
                        <div className={classes.collections}>{collectionPills}</div>
                    </div>
                </div>
                </div>
                <FavoriteButton recipeId={recipe.recipeId} favorited={favorited} />
            

        </div>
    )
}