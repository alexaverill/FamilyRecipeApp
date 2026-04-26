<script>
  import { resolve } from "$app/paths";
  import { GetCollections } from "$lib/API/CollectionApi";
  import { onMount } from "svelte";
  let collections = $state([]);
  onMount(async () => {
    collections = await GetCollections();
    console.log(collections);
  });
</script>

<div class="collections">
  <h1>Collections:</h1>
  {#each collections as collection}
    <a href={resolve(`./collections/${collection.collectionId}`)}>
      <div class="title">{collection.name}</div>
      <div class="subtitle">{collection.recipes.length} recipes</div>
    </a>
  {/each}
</div>

<style>
  .collections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    a {
      text-decoration: none;
      color: black;
      &:hover {
        background-color: lightgray;
      }
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      border: 2px solid black;
      border-radius: 0.5rem;
      .title {
        font-weight: bold;
      }
    }
  }
</style>
