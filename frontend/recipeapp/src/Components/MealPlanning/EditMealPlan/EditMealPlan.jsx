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

import LoadingButton from "@mui/lab/LoadingButton";
import { GetUsers } from "../../../API/BaseApi";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { v4 as uuidv4 } from "uuid";
import { IngredientCard } from "./IngredientCard";

export default function EditMealPlan() {
  const { planId } = useParams();
  const [planUserId, setPlanUserId] = useState(null);
  const [planIdState, setPlanId] = useState(null);
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);
  const [list, setList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [additionalIngredients, setAdditional] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSave, setLastSave] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [planId, setPlanId] = useState(null);
  const { user } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    let cachedRecipes = await LoadData("recipescache", 1);
    let users = await GetUsers();

    setAvailableUsers(users); //.filter((entry) => entry.userId !== user.userId));

    setRecipes(cachedRecipes.data);
    if (planId !== "null") {
      let plan = await GetPlan(planId);
      setPlanId(planId);
      setPlanUserId(plan.userId);
      setTitle(plan.title);
      setDays(plan.plan);
      setList([...plan.additionalIngredients, ...plan.list]);
      setAdditional(plan.additionalIngredients);
      setLastSave(new Date(plan.updatedDate));
      let selectedUsers = plan.shared.map((entry) => {
        return users?.find((user) => user.userId === entry).username;
      });
      setSelectedUsers([...selectedUsers]);
    }
    setLoading(false);
  };
  const handleSave = async () => {
    setSaving(true);
    let sharedUserIds = availableUsers
      .filter((user) =>
        selectedUsers.find((selected) => selected === user.username)
      )
      .map((entry) => entry.userId);

    let planObj = {
      userId: planUserId === null ? user.userId : planUserId,
      planId: planIdState === "null" ? null : planIdState,
      title: title,
      plan: days,
      shared: [...sharedUserIds],
      additionalIngredients: additionalIngredients,
      list: list,
    };
    let response = await CreatePlan(planObj);
    console.log(response);
    setPlanId(response.planId);
    setLastSave(new Date(response.updatedDate));
    setSaving(false);
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
      list: recipe.ingredients.map((ingredient) => {
        return { ingredient, checked: false, id: uuidv4() };
      }),
    };
    days[day].recipes.push({ scaleFactor: 1, recipe: simplifiedRecipe });
    days[day].editTime = Date.now();
    setDays([...days]);
    handleSave();
  };
  const handleAddIngredient = () => {
    if (newIngredient === "") {
      return;
    }
    setAdditional([
      ...additionalIngredients,
      { ingredient: newIngredient, checked: false, id: uuidv4() },
    ]);
    setNewIngredient("");
    handleSave();
  };
  const handleScaleChange = (name, recipeId, scaleFactor) => {
    let day = days.findIndex((day) => day.name === name);
    let recipeIdx = days[day].recipes.findIndex(
      (recipe) => recipe.recipe.recipeId === recipeId
    );
    days[day].recipes[recipeIdx].scaleFactor = scaleFactor;
    setDays([...days]);
    handleSave();
  };
  const removeRecipe = (name, recipeId) => {
    let day = days.findIndex((day) => day.name === name);
    let recipeIdx = days[day].recipes.findIndex(
      (recipe) => recipe.recipe.recipeId === recipeId
    );
    days[day].recipes.splice(recipeIdx, 1);
    setDays([...days]);
    handleSave();
  };
  const handleComment = (name, e) => {
    let day = days.findIndex((day) => day.name === name);
    days[day].comments = e.target.value;
    setDays([...days]);
    handleSave();
  };
  const handleAdditionalChecked = (item) => {
    let index = additionalIngredients.findIndex((entry) => entry === item);
    additionalIngredients[index].checked =
      !additionalIngredients[index].checked;
    setAdditional([...additionalIngredients]);
  };
  const handleIngredientChecked = (event, itemId, name, recipeId) => {
    let day = days.findIndex((day) => day.name === name);
    let recipeIdx = days[day].recipes.findIndex(
      (recipe) => recipe.recipe.recipeId === recipeId
    );
    let itemIdx = days[day].recipes[recipeIdx].recipe.list.findIndex(
      (item) => item.id === itemId
    );
    days[day].recipes[recipeIdx].recipe.list[itemIdx].checked =
      !days[day].recipes[recipeIdx].recipe.list[itemIdx].checked;

    setDays([...days]);
    handleSave();
  };
  let ingredients = days
    .map((day) => {
      return day?.recipes?.map((recipe) => {
        return recipe.recipe.list?.map((item) => ({
          item,
          scale: recipe.scaleFactor,
          day: day.name,
          recipeId: recipe.recipe.recipeId,
        }));
      });
    })
    .flat(Infinity);

  const handleDay = (editTime, name) => {
    let day = days.findIndex((day) => day.editTime === editTime);
    days[day].name = name;
    setDays([...days]);
  };
  let dayCards = days.map((day) => {
    return (
      <div key={day.editTime} className={classes.day_cards}>
        <div className={classes.titlerow}>
          <p className={classes.day_title}>
            <EditableText
              text={day.name}
              initialText={"Day"}
              label={"Day Name"}
              onChange={(e) => {
                handleDay(day.editTime, e.target.value);
              }}
            />
          </p>
          <AutoCompleteRecipeList
            recipes={recipes}
            onSelected={(e) => addRecipeToDay(day.name, e)}
          />
        </div>
        <div className={classes.recipes}>
          {day?.recipes?.map((recipe) => {
            return (
              <div className={classes.recipe_entry}>
                <p className={classes.recipe_entry_title}>
                  <Link to={`/recipe/${recipe?.recipe.recipeId}`}>
                    {recipe?.recipe.title}
                  </Link>
                </p>
                <div className={classes.recipeButtons}>
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
      </div>
    );
  });
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedUsers([...e.target.value]);
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  let ingredientList = [
    ...additionalIngredients.map((item) => {
      return { item };
    }),
    ...ingredients,
  ];
  console.log(ingredientList);
  ingredientList
    .sort((a, b) => {
      return b.item.checked - a.item.checked;
    })
    .reverse();
  let ingredientCards = ingredientList?.map((entry) => {
    if (entry)
      return (
        <IngredientCard
          item={entry.item}
          recipeId={entry.recipeId}
          handleAdditionalChecked={handleAdditionalChecked}
          handleIngredientChecked={handleIngredientChecked}
          day={entry.day}
          scaleFactor={entry.scale}
        />
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
            setTitle(e.target.value);
          }}
        />

        <div className={classes.buttons}>
          Last Saved: {lastSave.toLocaleString()}
          <Button onClick={addDay} variant="contained">
            Add Day
          </Button>
          <LoadingButton
            loading={saving}
            onClick={() => handleSave()}
            variant="contained"
          >
            Save
          </LoadingButton>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.days}>{dayCards}</div>
        <div className={classes.right}>
          <div className={classes.grocery}>
            <h2 className={classes.groceryTitle}>Grocery List</h2>
            <div className={classes.inputRow}>
              <input
                type="text"
                className={classes.text}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddIngredient();
                  }
                }}
                onChange={(e) => {
                  setNewIngredient(e.target.value);
                }}
              />
              <Button variant="contained" onClick={() => handleAddIngredient()}>
                Add
              </Button>
            </div>
            <div className={classes.list}>{ingredientCards}</div>
          </div>
          <div className={classes.shared}>
            Shared With:
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedUsers}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Shared With" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {availableUsers?.map((user) => (
                <MenuItem key={user.userId} value={user.username}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
