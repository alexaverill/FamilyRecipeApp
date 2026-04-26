<script>
  import CarbsEdit from "$lib/Components/Facts/CarbsEdit.svelte";
  import GenericFactEdit from "$lib/Components/Facts/GenericFactEdit.svelte";
  import { nutritionEditStore } from "$lib/stores/nutritionEditStore";

  let facts = $state([]);
  let factType = $state(GenericFactEdit);
  const onsave = (e) => {
    if (e.id >= 0) {
      $nutritionEditStore[e.id] = e;
      return;
    }
    //else$nutritionEditStore.push(e);
  };
  const onDelete = (e) => {
    if (e.id) {
      $nutritionEditStore.splice(e.id, 1);
      reload = !reload;
    }
  };
  let reload = $state(false);
</script>

<div class="facts">
  <div class="title">Nutrition Facts</div>
  {#key reload}
    {#each $nutritionEditStore as entry, i}
      {#if entry.name === "Carbs"}
        <CarbsEdit {onsave} {entry} id={i} {onDelete} />
      {:else}
        <GenericFactEdit
          {onsave}
          {onDelete}
          name={entry.name}
          value={entry.value}
          id={i}
        />
      {/if}
    {/each}
  {/key}
  <div class="add">
    <select bind:value={factType}>
      <option value={""}>Generic Fact</option>
      <option value={"Carbs"}>Carbohydrates</option>
    </select>
    <button
      onclick={() => {
        $nutritionEditStore.push({ name: factType, value: "" });
        reload = !reload;
      }}>Add</button
    >
  </div>
</div>

<style>
  .add {
    display: flex;
  }
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
