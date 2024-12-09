import { useContext, useEffect, useState } from "react";
import EditableText from "../../EditableText/EditableText";
import { Button } from "@mui/material";
import { LoadData } from "../../../utilities/storage/DataStorage";
import AutoCompleteRecipeList from "./AutoCompleteRecipeList";
import classes from "./EditMealPlan.module.css";
import ScaleRecipe from "./ScaleRecipe";
import { UserContext } from "../../UserContext/UserContext";
import { CreatePlan, GetPlan } from "../../../API/PlanApi";
import { Link, useParams } from "react-router-dom";
import EditableTextArea from "../../EditableTextArea/EditableTextArea";
import { multiply_recipe } from "../../../utilities/multiplyRecipe";

export default function EditMealPlan() {
  const { planId } = useParams();
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [additionalIngredients, setAdditional] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  // const [planId, setPlanId] = useState(null);
  const { user } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    console.log(planId);
    if (planId !== "null") {
      loadPlan();
    }
    load();
  }, []);
  const loadPlan = async () => {
    let plan = await GetPlan(planId);
    setTitle(plan.title);
    setDays(plan.plan);
    setAdditional(plan.additionalIngredients);
    console.log(plan);
  };
  const load = async () => {
    let cachedRecipes = await LoadData("recipescache", 1);
    console.log(cachedRecipes);
    setRecipes(cachedRecipes.data);
  };
  const handleSave = async () => {
    console.log("Saving");
    let planObj = {
      userId: user.userId,
      planId: planId === "null" ? null : planId,
      title: title,
      plan: days,
      shared: [],
      additionalIngredients: additionalIngredients,
    };
    let response = await CreatePlan(planObj);
  };
  const addDay = () => {
    let newDayName = `Day ${days.length + 1}`;
    let newDayObj = {
      name: newDayName,
      recipes: [],
      comments: "",
      editTime: Date.now(),
    };
    setDays([...days, newDayObj]);
  };
  const addRecipeToDay = (dayName, recipe) => {
    let day = days.findIndex((day) => day.name === dayName);
    console.log(recipe);
    let simplifiedRecipe = {
      recipeId: recipe.recipeId,
      title: recipe.title,
      ingredients: recipe.ingredients,
    };
    days[day].recipes.push({ scaleFactor: 1, recipe: simplifiedRecipe });
    days[day].editTime = Date.now();
    setDays([...days]);
  };
  const handleAddIngredient = () => {
    if (newIngredient === "") {
      return;
    }
    setAdditional([...additionalIngredients, newIngredient]);
    setNewIngredient("");
  };
  const handleScaleChange = (name, recipeId, scaleFactor) => {
    let day = days.findIndex((day) => day.name === name);
    let recipeIdx = days[day].recipes.findIndex(
      (recipe) => recipe.recipe.recipeId === recipeId
    );
    days[day].recipes[recipeIdx].scaleFactor = scaleFactor;
    setDays([...days]);
  };
  const removeRecipe = (name, recipeId) => {
    let day = days.findIndex((day) => day.name === name);
    let recipeIdx = days[day].recipes.findIndex(
      (recipe) => recipe.recipe.recipeId === recipeId
    );
    days[day].recipes.splice(recipeIdx, 1);
    setDays([...days]);
  };
  const handleComment = (name, e) => {
    let day = days.findIndex((day) => day.name === name);
    days[day].comments = e.target.value;
    setDays([...days]);
  };
  let additional = additionalIngredients.map((ingredient) => {
    return (
      <div className={classes.ingredient}>
        <label>
          <input type="checkbox" />
          <span>{ingredient}</span>
        </label>
      </div>
    );
  });
  let ingredients = days.map((day) => {
    console.log(day?.recipes);
    return day?.recipes?.map((recipe) => {
      console.log(recipe);
      return recipe.recipe.ingredients.map((ingredient) => (
        <div className={classes.ingredient}>
          <label>
            <input type="checkbox" />
            <span>{multiply_recipe(ingredient, recipe.scaleFactor)}</span>
          </label>
        </div>
      ));
    });
  });
  let dayCards = days.map((day) => {
    return (
      <div key={day.editTime} className={classes.day_cards}>
        <p className={classes.day_title}>{day.name}</p>
        <div className={classes.recipes}>
          {day?.recipes?.map((recipe) => {
            return (
              <div className={classes.recipe_entry}>
                <p className={classes.recipe_entry_title}>
                  <Link to={`/recipe/${recipe?.recipe.recipeId}`}>
                    {recipe?.recipe.title}
                  </Link>
                </p>
                <ScaleRecipe
                  onChange={(e) =>
                    handleScaleChange(day.name, recipe?.recipe.recipeId, e)
                  }
                  scale={recipe?.scaleFactor}
                />
                <Button
                  onClick={() =>
                    removeRecipe(day.name, recipe?.recipe.recipeId)
                  }
                >
                  X
                </Button>
              </div>
            );
          })}
        </div>
        <EditableTextArea
          initialText={"Add notes or other dishes here"}
          text={day.comments}
          onChange={(e) => handleComment(day.name, e)}
          label={"Comments"}
        />
        <AutoCompleteRecipeList
          recipes={recipes}
          onSelected={(e) => addRecipeToDay(day.name, e)}
        />
      </div>
    );
  });
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <EditableText
          text={title}
          initialText={"Title"}
          label={"Title"}
          onChange={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
          }}
        />
        <div className={classes.buttons}>
          <Button onClick={addDay} variant="contained">
            Add Day
          </Button>
          <Button onClick={() => handleSave()} variant="contained">
            Save
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.days}>{dayCards}</div>
        <div className={classes.grocery}>
          <h2>Grocery List</h2>
          <div class={classes.inputRow}>
            <input
              type="text"
              className={classes.text}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleAddIngredient()}>
              Add
            </Button>
          </div>
          {additional}
          {ingredients}
        </div>
      </div>
    </div>
  );
}
