<script>
  import { onMount } from "svelte";
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
  <div>
      Total Carbohydrates {carbs}g
    </div>
    <div>Dietary Fiber{fiber}g </div>
    <div>
      Total Sugar{sugar}g
    </div>
    <div>Includes {addedSugar}g added sugar</div>

</div>

<style>
  .carbs {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 2px solid black;
    div {
      display: flex;
      gap: 0.5rem;
      input {
        width: 60px;
      }
    }
  }
</style>
