import { useState, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import classes from "./Import.module.css";
import { parseRecipe } from "../../utilities/parseRecipe";
import { UserContext } from "../UserContext/UserContext";
import { CreateRecipe } from "../../API/RecipeApi";
import { saveRecipeToCache } from "../../utilities/storage/DataStorage";
export function Import() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState(false);
  const { user } = useContext(UserContext);
  const handleClick = async (e) => {
    if (title.length <= 0) {
      setError("You must enter a title!");
      return;
    }
    if (!recipe || recipe.length <= 0) {
      setError("You must enter a recipe!");
      return;
    }
    let parsedRecipe = parseRecipe(recipe);
    if (parsedRecipe.error) {
      setError(parsedRecipe.message);
      return;
    }
    setIsLoading(true);
    let eventObj = {
      userId: user.userId,
      recipeId: null,
      parentId: null,
      title,
      description: "",
      source: "",
      ingredients: parsedRecipe.ingredients,
      steps: parsedRecipe.steps,
      notes: "",
      user,
      image: { icon: "20_utensils.svg", color: "#4DC643" },
    };
    let data = await CreateRecipe(eventObj);
    console.log(data);
    if (data) {
      await saveRecipeToCache(data);
      setSucces(true);
      setTitle("");
      setRecipe("");
    } else {
      setError("Error Saving Recipe");
    }
    setIsLoading(false);
  };
  return (
    <div className="content">
      <h1>Import Recipe</h1>
      <p>
        Seperate the ingredients and the steps with{" "}
        <span className={classes.bold}>@@@</span>
      </p>
      {success && (
        <p className={classes.success}>Successfully Imported Recipe!</p>
      )}
      <p className={classes.error}>{error}</p>
      <div className={classes.importCol}>
        <TextField
          size="small"
          value={title}
          placeholder="Title"
          className={classes.title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(false);
            setSucces(false);
          }}
        ></TextField>
        <textarea
          className={classes.textarea}
          value={recipe}
          onChange={(e) => {
            setRecipe(e.target.value);
            setError("");
            setSucces(false);
          }}
        ></textarea>
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={recipe.length <= 0 || title.length <= 0 || isLoading}
        >
          Import
        </Button>
      </div>
    </div>
  );
}
