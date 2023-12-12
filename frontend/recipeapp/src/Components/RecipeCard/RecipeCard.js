import { useNavigate } from "react-router-dom"
import "./RecipeCard.css"
export default function RecipeCard({recipe}) {
    const navigate = useNavigate();
    return (
        <div class="card" onClick={()=>navigate('/recipe/'+recipe.recipeId,{state:{recipe}})}>
            <div class="card-img">

            </div>
            <div class="card-content">
                <div>
                <div className="card-title">{recipe.title}</div>
                <div className="subtitle">
                    <div>Contributed by USER</div>
                    <div class="seperator">
                        <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="3" r="2.5" fill="#3CCEE2" />
                        </svg>
                    </div>
                    <div>Variations</div>
                </div>
                <div className="card-desc">
                    {recipe.description}
                </div>
                <div>COLLECTIONS</div>
                </div>
                <div><img src="favorite.png"/></div>
            </div>
            
        </div>
    )
}