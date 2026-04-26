<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import RecipeEdit from "$lib/Components/RecipeEdit.svelte";
  import { session, user } from "$lib/stores/authStore";
  import { recipeStore } from "$lib/stores/recipestore.js";
  import { onMount } from "svelte";
  let { params }: PageParams = $props();

  let recipe = $derived(
    $recipeStore?.filter((recipe) => recipe.recipeId === params.id)[0],
  );
</script>

<RecipeEdit {recipe} />
