<script>
  import trash from "$lib/assets/trash-can.png";
  import edit from "$lib/assets/edit.png";
  let {
    name = $bindable(),
    value = $bindable(),
    onsave,
    id,
    onDelete,
  } = $props();
  let editing = $state(false);
  const handleBlur = (e) => {
    if (name.length > 0 && value.length > 0) {
      onsave({ id, name, value });
      editing = false;
    }
  };
</script>

<div class="entry">
  {#if editing}
    <label
      >Name:<input type="text" bind:value={name} onblur={handleBlur} /></label
    >
    <label>Value:<input type="text" bind:value onblur={handleBlur} /></label>
    <button
      onclick={() => {
        onDelete({ id });
      }}><img src={trash} /></button
    >
    <button
      class="primary"
      onclick={() => {
        onsave({ id, name, value });
        editing = false;
      }}>Save</button
    >
  {:else}
    <div>{name}</div>
    <div>{value}</div>
    <button onclick={() => (editing = true)}><img src={edit} /></button>
  {/if}
</div>

<style>
  .entry {
    display: flex;
    gap: 0.5rem;
    label {
      display: flex;
      flex-direction: column;
      input {
        width: 100px;
      }
    }
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid black;
  }
</style>
