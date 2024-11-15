import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  TextField,
  createChainedFunction,
  Autocomplete,
  Box,
} from "@mui/material";
import RecipeCard from "../RecipeCard/RecipeCard";
import { UserContext } from "../UserContext/UserContext";
import { GetRecipes } from "../../API/RecipeApi";
import { GetUsers } from "../../API/BaseApi";
import MultiSelect from "../Multiselect/Multiselect";
import { SaveData } from "../../utilities/storage/DataStorage";
import { LoadData } from "../../utilities/storage/DataStorage";
import classes from "./Cookbook.module.css";
import CookBookCard from "./CookbookCard/CookbookCard";
import Collections from "../Collections/Collections";
export default function Recipes() {
  const { favorites } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const carouselNumber = 8;
  const navigate = useNavigate();
  useEffect(() => {
    LoadRecipes();
  }, []);
  const createRecipeCards = (recipes) => {
    return recipes.map((recipe) => {
      return (
        <CookBookCard recipe={recipe} key={recipe.recipeId} favorited={true} />
      );
    });
  };
  const getRecentRecipes = (recipes) => {
    let datedRecipes = recipes.filter((recipe) => {
      return !!recipe.creationDate;
    });
    let mostRecent = datedRecipes
      .sort((a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
      })
      .slice(0, carouselNumber);
    return createRecipeCards(mostRecent);
  };
  const getFeaturedRecipes = (recipes) => {
    let tmpArray = [];

    for (let x = 0; x < carouselNumber; x++) {
      let index = Math.floor(Math.random() * recipes.length);
      let recipe = recipes.splice(index, 1);
      tmpArray.push(recipe[0]);
    }
    return createRecipeCards(tmpArray);
  };
  const LoadRecipes = async () => {
    setIsLoading(true);
    let cachedRecipes = await LoadData("recipescache", 1);
    let cachedUsers = await LoadData("usercache", 1);
    let data;
    let refreshRecipes = false;
    let refereshUsers = false;
    if (cachedRecipes) {
      data = cachedRecipes?.data;
      setRecipes(data);
      setFiltered(data);
      setFeaturedRecipes(getFeaturedRecipes(data));
      setRecentlyAdded(getRecentRecipes(data));
      if (Date.now() > cachedRecipes.timestamp + 30 * 60 * 1000) {
        console.log("Recipe Cache Expired");
        refreshRecipes = true;
      }
    } else {
      fetchAndCacheRecipes();
    }
    if (cachedUsers) {
      setUserList(cachedUsers?.data);
      if (Date.now() > cachedUsers.timestamp + 4 * 60 * 60 * 1000) {
        console.log("User Cache Expired");
        refereshUsers = true;
      }
    } else {
      await fetchAndCacheUsers();
    }
    setIsLoading(false);
    if (refreshRecipes) {
      console.log("Recipe Cache Refreshing");
      await fetchAndCacheRecipes();
    }
    if (refereshUsers) {
      await fetchAndCacheUsers();
    }
  };
  let fetchAndCacheRecipes = async () => {
    let data = await GetRecipes();
    if (data) {
      setRecipes(data);
      await SaveData("recipescache", data);
      setFiltered(data);
    }
  };
  let fetchAndCacheUsers = async () => {
    let users = await GetUsers();
    if (users) {
      setUserList(users);
      await SaveData("usercache", users);
    }
  };
  let favoriteRecipes = recipes.filter((recipe) => {
    return favorites.includes(recipe.recipeId);
  });
  let favoriteCards = favoriteRecipes?.map((recipe) => {
    return (
      <CookBookCard recipe={recipe} key={recipe.recipeId} favorited={true} />
    );
  });
  const filterRecipes = (e) => {
    if (e.length > 1) {
      let filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(e) ||
          recipe.description.toLowerCase().includes(e)
      );
      setFiltered(filtered);
    }
    if (e.length === 0) {
      setFiltered(recipes);
    }
  };
  return (
    <div className="content">
      <div className="recipeHeader">
        <div className="title-filter">
          <h1>Our Cookbook</h1>
        </div>
        <div className="search-and-add">
          <Autocomplete
            id="recipe-search"
            size="small"
            sx={{ width: 300 }}
            options={recipes}
            autoHighlight
            getOptionLabel={(option) => option.title}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                let title = event.target.value;
                let recipe = recipes.find((recipe) => recipe.title === title);
                if (recipe) {
                  navigate(`/recipe/${recipe.recipeId}`);
                }
              }
            }}
            onChange={(event, value) => {
              if (value?.recipeId) {
                navigate(`/recipe/${value.recipeId}`);
              }
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Link
                  component="li"
                  id={option.recipeId}
                  className={classes.searchLink}
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  to={`/recipe/${option.recipeId}`}
                >
                  {option.title}
                </Link>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search for a Recipe"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Link component="button" to="/create" className="recipeLinkButton">
            Add New Recipe
          </Link>
          <Link component="button" to="/import" className="recipeLinkButton">
            Import Recipe
          </Link>
          <Link component="button" to="/recipes" className="recipeLinkButton">
            View All Recipes
          </Link>
        </div>
      </div>
      <div className="recipeGrid">
        <section>
          <h2>Recently Added</h2>
          <div className={classes.scrollableContainer}>{recentlyAdded}</div>
        </section>
        <section>
          <h2>Your Favorites</h2>
          <div className={classes.scrollableContainer}>
            {favoriteCards.length > 0
              ? favoriteCards
              : "You have no favorites."}
          </div>
        </section>
        <section>
          <h2>Featured Recipes</h2>
          <div className={classes.scrollableContainer}>{featuredRecipes}</div>
        </section>
        <section>
          <h2>Collections</h2>
          <Collections />
        </section>
      </div>
    </div>
  );
}
