import { useNavigate } from "react-router-dom"
import { Chip } from "@mui/material";
import classes from "./RecipeCard.module.css"
import FavoriteButton from "../FavoriteButton/FavoriteButton";
export default function RecipeCard({ recipe,favorited }) {
    const navigate = useNavigate();
    const collectionPills = recipe.collections?.map(collection => {
        return <Chip label={collection.name} key={collection.collectionId}/>
    })
    return (
        <div className={classes.card}>
            <div className={classes.clickableCard} onClick={() => navigate('/recipe/' + recipe.recipeId, { state: { recipe } })}>
                <div className={classes.cardImg}>

                </div>
                <div className={classes.cardContent}>
                    <div>
                        <div className={classes.cardTitle}>{recipe.title}</div>
                        <div className={classes.subtitle}>
                            <div>Contributed by {recipe.user?.username}</div>
                            <div className={classes.seperator}>
                                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="2.5" cy="3" r="2.5" fill="#3CCEE2" />
                                </svg>
                            </div>
                            <div>Variations</div>
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