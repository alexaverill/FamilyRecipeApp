<script>
import Carbs from "$lib/Components/Facts/Carbs.svelte"
import Generic from "$lib/Components/Facts/Generic.svelte"
let {facts} = $props();
</script>

<div class="facts">
  <div class="title">Nutrition Facts</div>
  
    {#each facts as entry, i}
      {#if entry.name === "Carbs"} 
        <Carbs  {entry} id={i}  />
      {:else}
        <Generic
          name={entry.name}
          value={entry.value}
          id={i}
        />
      {/if}
    {/each}
</div>

<style>
 .title {
    font-weight: bold;
    font-size: 20px;
  }
  .facts {
    border-radius: 0.5rem;
    width: 350px;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 5px solid black;
    display: flex;
    flex-direction: column;
  }
</style>
