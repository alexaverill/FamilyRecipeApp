<script>
import edit from "$lib/assets/edit.png";
let {value=$bindable(),placeholder} = $props();
let isEdit = $state(false);
</script>
<div onclick={()=>{if(!isEdit){isEdit = true}}}>
{#if isEdit}
<input type="text" bind:value={value} onblur={()=>isEdit= false}/>
{:else}
    {#if value.length > 0}
      {value} <img src={edit}/>
  {:else}
    {placeholder} <img src={edit}/>
  {/if}
{/if}
</div>

<style>

</style>
