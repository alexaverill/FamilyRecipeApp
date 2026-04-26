<script lang="ts">
  import trash from "$lib/assets/trash-can.png";
  import { resolve } from "$app/paths";
  import edit from "$lib/assets/edit.png";
  import { session, user } from "$lib/stores/authStore";
  import { recipeStore } from "$lib/stores/recipestore";
  import RecipeImage from "$lib/Components/RecipeImage.svelte";
  import { multiply_recipe } from "$lib/utilities/multiplyRecipe";
  import { onMount } from "svelte";
  import { CreateRecipe } from "$lib/API/RecipeApi";
  import EditableText from "./EditableText.svelte";
  import RecipeImageEdit from "./RecipeImageEdit.svelte";
  import NutritionFactsEdit from "./NutritionFactsEdit.svelte";
  import { nutritionEditStore } from "$lib/stores/nutritionEditStore";

  let { recipe } = $props();
  $effect(() => {
    console.log(recipe);
    if (!recipe?.recipeId) {
      $nutritionEditStore = [];
      return;
    }
    icon = recipe?.image?.icon;
    color = recipe?.image?.color;
    recipeId = recipe.recipeId;
    title = recipe.title;
    ingredients = recipe?.ingredients;
    steps = recipe?.steps;
    $nutritionEditStore = recipe?.nutrition;
  });
  let icon = $state(null);
  let color = $state(null);
  let photo = $state(null);
  let recipeId = $state(null);
  let description = $state("");
  let source = $state("");
  let notes = $state("");
  let title = $state("");
  let ingredients = $state([]);
  let steps = $state([]);
  console.log($user);
  const save = async () => {
    /*    let eventObj = {
      userId: user.userId,
      recipeId,
      parentId,
      title,
      description,
      source,
      ingredients,
      steps,
      notes,
      user,
      image: { icon, color },
    }; */
    if (recipeId) {
      console.log("Update");
      recipe.title = title;
      recipe.description = description;
      recipe.source = source;
      recipe.ingredients = $state.snapshot(ingredients);
      recipe.steps = $state.snapshot(steps);
      if (!recipe.image) {
        recipe.image = { icon: icon, color: color };
      } else {
        recipe.image.icon = icon;
        recipe.image.color = color;
      }
      recipe.nutrition = $nutritionEditStore;
      console.log(recipe);
      let saveRequest = await CreateRecipe(recipe);
      console.log(saveRequest);
      return;
    }
    //creat new recipe
    let newRecipe = {
      userId: $user.userId,
      title: title,
      description: description,
      source: source,
      ingredients: $state.snapshot(ingredients),
      steps: $state.snapshot(steps),
      user: $user,
      image: photo ? photo : { icon: icon, color: color },
      nutrition: $nutritionEditStore,
    };
    let saveRequest = await CreateRecipe(newRecipe);
    recipeId = saveRequest.recipeId;
    console.log(saveRequest);
  };
  const addIngredient = () => {
    ingredients.push("");
  };
  const addStep = () => {
    steps.push("");
  };
  const remove = (index: number, collection: Array<any>) => {
    collection.splice(index, 1);
  };
</script>

<div class="recipe">
  <div class="left">
    <RecipeImageEdit bind:color bind:option={icon} bind:photo />
    <NutritionFactsEdit />
  </div>
  <div class="right">
    <div class="column">
      <div class="row titleRow">
        <h1>
          <EditableText bind:value={title} placeholder="New Recipe Name" />
        </h1>
        <div class="controls">
          <button class="primary" onclick={() => save()}>Save</button>
        </div>
      </div>
      <div class="description">
        <EditableText
          bind:value={description}
          placeholder="Enter a description"
        />
      </div>
      <div class="source">
        <EditableText bind:value={source} placeholder="Enter a source" />
      </div>
    </div>
    <div class="collections"></div>
    <div class="ingredients">
      <div class="row ingredients">
        <h2 class="title">Ingredients</h2>
      </div>
      <ul>
        {#each ingredients as ingredient, i}
          <li>
            <input type="text" bind:value={ingredients[i]} />
            <button
              onclick={() => remove(i, ingredients)}
              aria-label="Delete Ingredient"
            >
              <img src={trash} /></button
            >
          </li>
        {/each}
      </ul>
      <button class="primary" onclick={() => addIngredient()}
        >Add Ingredient</button
      >
    </div>
    <div class="steps">
      <div class="row"><h2 class="title">Steps</h2></div>
      <ol>
        {#each steps as step, i}<li>
            <input type="text" bind:value={steps[i]} />
            <button onclick={() => remove(i, steps)} aria-label="Delete Step"
              ><img src={trash} /></button
            >
          </li>{/each}
      </ol>
      <button class="primary" onclick={() => addStep()}>Add Step</button>
    </div>
  </div>
</div>

<style>
  .recipe {
    width: 100%;
    display: flex;
    gap: 3rem;
    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .row {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .titleRow {
    justify-content: space-between;
    align-items: center;
  }
  .ingredients {
    align-items: center;
    justify-content: space-between;
  }

  li {
    margin-top: 1rem;
    line-height: 1.5rem;
  }
  input {
    border-radius: 0.25rem;
    width: 80%;
    padding: 0.5rem;
  }
</style>
