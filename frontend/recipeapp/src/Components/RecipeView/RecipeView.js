import { Link, useLocation } from "react-router-dom"

export default function RecipeView(){
    const location = useLocation();
    let recipe = location.state.recipe;
    let instructions = location.state.recipe.instructions;
    let ingredients = location.state.recipe.ingredients;
    let displayInstructions = instructions.map((instruction)=>{
        <div>{instruction}</div>
    });
    let displayIngredients = ingredients.map((ingredient)=>{
        <div>{ingredient}</div>
    })
    return (
        <>
            <div className='recipes'>
                <div className="titleRow">
                    <h1>{recipe.title}</h1>
                    <Link to={'edit'}>Edit</Link>
                </div>
                <div className='leftAlign descriptionRow'>
                    {recipe.description}
                </div>
                <div className='leftAlign'>
                    Pairs
                </div>
                <div className='leftAlign'>
                    Tags
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <div className='list'>
                        {displayIngredients}
                    </div>
                </div>
                <div>
                    <h2>Instructions</h2>
                    <div className='list'>
                        {displayInstructions}
                    </div>
                </div>
            </div>
        </>
    )
}