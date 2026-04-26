<script>
  import { onMount } from "svelte";
  import trash from "$lib/assets/trash-can.png";
  let { onsave, id, entry, onDelete } = $props();
  onMount(() => {
    carbs = entry.carbs;
    fiber = entry.fiber;
    sugar = entry.sugar;
    addedSugar = entry.addedSugar;
  });
  let carbs = $state(null);
  let fiber = $state(null);
  let sugar = $state(null);
  let addedSugar = $state(null);
  let editing = $state(false);
</script>

<div class="carbs">
  {#if editing}
    <label>
      Total Carbohydrates <input type="text" bind:value={carbs} />g
    </label>
    <label>Dietary Fiber<input type="text" bind:value={fiber} />g </label>
    <label>
      Total Sugar<input type="text" bind:value={sugar} />g
    </label>
    <label
      >Includes <input type="text" bind:value={addedSugar} />g added sugar</label
    >

    <div class="row">
      <button onclick={() => onDelete({ id })}><img src={trash} /></button>
      <button
        class="primary"
        onclick={() => {
          onsave({ id, name: "Carbs", carbs, fiber, sugar, addedSugar });
          editing = false;
        }}>Save</button
      >
    </div>
  {:else}
    <button onclick={() => (editing = true)}>Edit</button>
    <label>
      Total Carbohydrates {carbs}g
    </label>
    <label>Dietary Fiber{fiber}g </label>
    <label>
      Total Sugar{sugar}g
    </label>
    <label>Includes {addedSugar}g added sugar</label>
  {/if}
</div>

<style>
  .carbs {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 2px solid black;
    label {
      display: flex;
      gap: 0.5rem;
      input {
        width: 60px;
      }
    }
  }
</style>
