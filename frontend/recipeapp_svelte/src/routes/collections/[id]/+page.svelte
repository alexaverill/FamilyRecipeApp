<script>
  import { GetCollection } from "$lib/API/CollectionApi.js";
  import RecipeCard from "$lib/Components/RecipeCard.svelte";
  import { recipeStore } from "$lib/stores/recipestore.js";
  import { onMount } from "svelte";

  let { params } = $props();
  let collection = $state();
  let fullRecipes = $state([]);
  console.log(params);

  onMount(async () => {
    let collectionRequest = await GetCollection(params.id);
    collection = collectionRequest;
    for (let recipe of collectionRequest?.recipes) {
      fullRecipes.push(
        $recipeStore.find((entry) => entry.recipeId == recipe.recipeId),
      );
    }
  });
</script>

<div class="collections">
  <h1>{collection?.name}</h1>
  <div class="recipeGrid">
    {#each fullRecipes as recipe}
      <RecipeCard
        name={recipe?.title}
        id={recipe?.recipeId}
        image={recipe?.image}
        contributor={recipe?.user?.username}
      />
    {/each}
  </div>
</div>

<style>
  .collections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .recipeGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 2rem;
    row-gap: 2rem;
  }
</style>
