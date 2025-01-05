import classes from "./EditMealPlan.module.css";
import { multiply_recipe } from "../../../utilities/multiplyRecipe";
export function IngredientCard({
  item,
  day,
  recipeId,
  scaleFactor,
  handleIngredientChecked,
  handleAdditionalChecked,
}) {
  if (recipeId) {
    return (
      <div
        className={
          item.checked
            ? `${classes.ingredient} ${classes.checkedIngredient}`
            : classes.ingredient
        }
      >
        <label>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => handleIngredientChecked(e, item.id, day, recipeId)}
          />
          <span>{multiply_recipe(item.ingredient, scaleFactor)}</span>
        </label>
      </div>
    );
  }
  return (
    <div
      className={
        item.checked
          ? `${classes.ingredient} ${classes.checkedIngredient}`
          : classes.ingredient
      }
    >
      <label>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={(e) => handleAdditionalChecked(item)}
        />
        <span>{item.ingredient}</span>
      </label>
    </div>
  );
}
