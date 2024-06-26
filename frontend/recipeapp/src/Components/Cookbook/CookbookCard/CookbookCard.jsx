import { useNavigate } from "react-router-dom"
import { Chip } from "@mui/material";
import classes from "./CookbookCard.module.css"
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
export default function CookbookCard({ recipe, favorited }) {
    const navigate = useNavigate();
    const collectionPills = recipe.collections?.map(collection => {
        return <Chip className={classes.chip} label={collection.name} key={collection.collectionId} href={`/collections/${collection.collectionId}`} />
    })
    let color = recipe.image?.color ?? "#FF9F2F";
    let style = { backgroundColor: color };
    let image = recipe.image?.icon ?? "seven.svg";
    let imagePath = `/images/${image}`;
    return (
        <div className={classes.card}>
            <div className={classes.clickableCard} onClick={() => navigate('/recipe/' + recipe.recipeId, { state: { recipe } })}>
                <div className={classes.cardImg} style={style} >
                    <img className={classes.img} src={imagePath} />
                </div>
                <div className={classes.cardContent}>
                    <div className={classes.textContent}>
                        <div className={classes.cardTitle}>{recipe.title}</div>
                        {/* <FavoriteButton recipeId={recipe.recipeId} favorited={favorited} /> */}
                        <div className={classes.subtitle}>
                            <div>Contributed by {recipe.user?.username}</div>
                        </div>
                        <div className={classes.scrollabe}>
                            <div className={classes.collections}>{collectionPills}</div>
                        </div>
                    </div>
                </div>
            </div>
            


        </div>
    )
}