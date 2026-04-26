<script lang="ts">
  import CollectionRow from "$lib/Components/CollectionRow.svelte";
  import { resolve } from "$app/paths";
  import edit from "$lib/assets/edit.png";
  import { session, user } from "$lib/stores/authStore";
  import { recipeStore } from "$lib/stores/recipestore";
  import RecipeImage from "$lib/Components/RecipeImage.svelte";
  import { multiply_recipe } from "$lib/utilities/multiplyRecipe";
  import NutritionFacts from "$lib/Components/NutritionFacts.svelte";
  import { onMount } from "svelte";
  import { GetRecipe } from "$lib/API/RecipeApi";
  let scale = $state(1);
  let { params }: PageProps = $props();

  let recipe = $derived(
    $recipeStore?.filter((recipe) => recipe?.recipeId === params.id)[0],
  );
  console.log(recipe);

  let isYours = $derived(recipe?.user.userId === $session.userSub);
</script>

<div class="recipe">
  <div class="left">
    <RecipeImage
      image={recipe?.image?.icon}
      background={recipe?.image?.color}
    />
    <NutritionFacts facts={recipe?.nutrition} />
  </div>
  <div class="right">
    <div class="row header">
      <h1>{recipe?.title}</h1>
      <div class="controls">
        {#if isYours}
          <a
            href={resolve(`/recipe/${recipe?.recipeId}/edit`)}
            class="editButton">Edit</a
          >
        {/if}
      </div>
    </div>
    <div class="collections">
      {#if recipe?.collections}<CollectionRow
          collections={recipe?.collections}
        />{/if}
    </div>
    <div class="ingredients">
      <div class="row ingredients titleRow">
        <h2 class="title">Ingredients</h2>
        <div class="row scale">
          <button
            onclick={() => (scale = 0.5)}
            class={`scaleBtn first ${scale === 0.5 ? "active" : ""}`}>.5</button
          >
          <button
            onclick={() => (scale = 1)}
            class={`scaleBtn second ${scale === 1 ? "active" : ""}`}>1</button
          >
          <button
            onclick={() => (scale = 2)}
            class={`scaleBtn third" ${scale === 2 ? "active" : ""}`}>2</button
          >
          <input
            class="scaleInput"
            type="text"
            oninput={(e) => {
              let parsedValue = parseFloat(e.target.value);
              if (parsedValue > 0) {
                scale = parsedValue;
                return;
              }
              scale = 1;
            }}
            placeholder="custom"
          />
        </div>
      </div>
      <ul>
        {#each recipe?.ingredients as ingredient}
          <li>{multiply_recipe(ingredient, scale)}</li>
        {/each}
      </ul>
    </div>
    <div class="steps">
      <div class="row"><h2 class="title">Steps</h2></div>
      <ol>
        {#each recipe?.steps as step}<li>{step}</li>{/each}
      </ol>
    </div>
  </div>
</div>

<style>
  .recipe {
    display: flex;
    gap: 3rem;
    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }
  .row {
    display: flex;
  }
  .header {
    justify-content: space-between;
  }
  .editButton {
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    background-color: rgb(221, 63, 100);
    text-decoration: none;
    color: white;
  }
  .ingredients {
    align-items: center;
    justify-content: space-between;
  }
  .titleRow {
    gap: 1rem;
    width: 100%;
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
  .scale {
    .scaleBtn {
      background: none;
      color: rgb(221, 63, 100);
      border: 1px solid rgba(221, 63, 100, 0.5);
    }
    .active {
      color: white;
      background-color: rgb(221, 63, 100);
    }
    .first {
      border-radius: 5px 0 0 5px;
    }
    .second {
      border-radius: 0;
    }
    .third {
      border-radius: 0;
    }
    .scaleInput {
      border-radius: 0 5px 5px 0;
      color: rgb(221, 63, 100);
      height: 41px;
      width: 50px;
      border: 1px solid rgba(221, 63, 100, 0.5);
    }
  }
  li {
    margin-top: 1rem;
    line-height: 1.5rem;
  }
  .scaleBtn {
    padding: 0.25rem 1rem 0.25rem 1rem;
    height: 45px;
    width: 45px;
  }
</style>
