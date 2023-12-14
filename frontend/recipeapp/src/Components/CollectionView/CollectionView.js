import { useLocation } from "react-router-dom"

export default function CollectionsView(){
    const location = useLocation();
    // let recipeDisplay = recipes?.map((recipe) => {
    //     return <RecipeCard recipe={recipe} />; //<Link to={'/recipe/' + recipe.recipeId} state={{ recipe }}>
    // })
    return (
        <div class="content">
        <div className="recipeHeader">
            <div>
                <h1>{location.state.collection.name}</h1>
            </div>
        </div>
        <div className="recipeGrid">
            {/* {recipeDisplay} */}
        </div>
    </div>
    )
}