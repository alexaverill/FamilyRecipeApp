<script>
  import { recipeStore } from "$lib/stores/recipestore";
  import Typeahead from "svelte-typeahead/Typeahead.svelte";
  import RecipeCard from "./RecipeCard.svelte";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";
  const handleSelect = (e) => {
    let id = e.detail.original.recipeId;
    goto(resolve(`/recipe/${id}`));
  };
</script>

<div class="column">
  <div class="row">
    <Typeahead
      hideLabel
      showDropdownOnFocus
      data={$recipeStore}
      extract={(item) => item.title}
      on:select={handleSelect}
    />
    <a href={resolve("/recipe/create")} class="linkButton">Create Recipe</a>
    <a href={resolve("/recipeimport")} class="linkButton">Import Recipe</a>
  </div>
  <div class="grid">
    {#each $recipeStore as recipe}
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
  .column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .row {
    justify-content: end;
    gap: 1rem;
    display: flex;
    flex-direction: row;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 2rem;
    row-gap: 2rem;
  }
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
