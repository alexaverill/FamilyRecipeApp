import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import classes from "./RecipeView.module.css"
import { Button } from "@mui/material";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
export default function RecipeView() {
    const {recipeId} = useParams();
    const location = useLocation();
    const [recipe, setRecipe] = useState({});
    // let instructions = location.state.recipe.instructions;
    // let ingredients = location.state.recipe.ingredients;
    let displaySteps = recipe.steps?.map((steps) => {

        return <li>{steps}</li>
    });
    let displayIngredients = recipe.ingredients?.map((ingredient) => {
        return <li>{ingredient}</li>
    })
    const loadRecipe = async() =>{
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
        }
    }
    useEffect(() => {
        if (!location.state) {
            loadRecipe();
        } else {
            setRecipe(location.state.recipe);
        }
    }, []);
    return (
        <div className="content">
            <div className="twoColumn">
                <div><img src="/placeholder_1.png" /></div>
                <div className='recipes'>
                    <div className={classes.titleRow}>
                        <div className="recipeTitle">{recipe.title}</div>
                        <div class={classes.actions}>
                            <Link component="button" className={classes.editLink} to={'edit'} state={{recipe}}><img className={classes.editImg} src="/edit.png" /></Link>
                            <Button><img src="/download.png" /></Button>
                            <FavoriteButton />
                            <Link component="button" to="/create" state={{recipe,variation:true}}className="recipeLinkButton">Add Variation</Link>
                        </div>
                    </div>
                    <div className='leftAlign descriptionRow'>
                        {recipe.description}
                    </div>
                    <div className='leftAlign'>
                        Tags
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