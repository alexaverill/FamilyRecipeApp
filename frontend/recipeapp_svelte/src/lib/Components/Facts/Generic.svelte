<script>
  import trash from "$lib/assets/trash-can.png";
  import edit from "$lib/assets/edit.png";
  let {
    name,
    value,
   
    
  } = $props();
 
</script>

<div class="entry">

    <div>{name}</div>
    <div>{value}</div>
   

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
