import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import RecipeCard from "../RecipeCard/RecipeCard";
import { UserContext } from "../UserContext/UserContext";
import { GetRecipes } from "../../API/RecipeApi";
import { GetUsers } from "../../API/BaseApi";
import MultiSelect from "../Multiselect/Multiselect";
import { SaveData } from "../../utilities/storage/DataStorage";
import { LoadData } from "../../utilities/storage/DataStorage";
import classes from './Cookbook.module.css';
import CookBookCard from './CookbookCard/CookbookCard'
export default function Recipes() {
    const { favorites } = useContext(UserContext)
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userList,setUserList] = useState([]);
    
    useEffect(() => {
        LoadRecipes();
    }, [])
    const LoadRecipes = async () => {
        setIsLoading(true);
        let cachedRecipes = await LoadData("recipescache",1);
        let cachedUsers = await LoadData("usercache",1);
        let data;
        let refreshRecipes  = false;
        let refereshUsers = false;
        if(cachedRecipes){
            data = cachedRecipes?.data;
            console.log(data);
            setRecipes(data);
            setFiltered(data);
            if(Date.now() > cachedRecipes.timestamp+(30*60* 1000)){
                console.log("Recipe Cache Expired");
                refreshRecipes = true;
            }

        }else{
            fetchAndCacheRecipes();
        }
        if(cachedUsers){
            setUserList(cachedUsers?.data);
            if(Date.now() > cachedUsers.timestamp+(4 * 60 *60* 1000)){
                console.log("User Cache Expired");
                refereshUsers = true;
            }
        }else {
            await fetchAndCacheUsers();
        }
        setIsLoading(false);
        if(refreshRecipes){
            console.log("Recipe Cache Refreshing");
            await fetchAndCacheRecipes();
        }
        if(refereshUsers){
            await fetchAndCacheUsers();
        }
    }
    let fetchAndCacheRecipes = async () =>{
            let data  = await GetRecipes();
            if(data){
                setRecipes(data);
                await SaveData("recipescache",data)
                setFiltered(data);
            }
    }; 
    let fetchAndCacheUsers = async ()=>{
        let users = await GetUsers();
        if(users){
            setUserList(users);
            await SaveData("usercache",users);
        }
    }
    let favoriteRecipes = recipes.filter(recipe => { 
        return favorites.includes(recipe.recipeId)
    });
    let favoriteCards = favoriteRecipes?.map((recipe)=>{
        return <CookBookCard recipe={recipe} key={recipe.recipeId} favorited={true} />;
    })
    const filterRecipes = (e) => {
        if (e.length > 1) {
            let filtered = recipes.filter(recipe => recipe.title.toLowerCase().includes(e) || recipe.description.toLowerCase().includes(e));
            setFiltered(filtered);
        }
        if (e.length === 0) {
            setFiltered(recipes);
        }
    }

    return (
        <div className="content">
            <div className="recipeHeader">
                <div className='title-filter'>
                    <h1>Our Cookbook</h1> 
                </div>
                <div className="search-and-add">
                    <TextField size="small" label="Search" onChange={(e) => filterRecipes(e.target.value)}></TextField>
                    <Link component="button" to="/create" className="recipeLinkButton">Add New Recipe</Link>
                    <Link component="button" to="/recipes" className="recipeLinkButton">View All Recipes</Link>
                </div>
            </div>
            <div className="recipeGrid">
                <section>
                    <h2>Your Favorites</h2>
                    <div className={classes.scrollableContainer}>
                        {favoriteCards}
                    </div>
                </section>
            </div>
        </div>
    )
}