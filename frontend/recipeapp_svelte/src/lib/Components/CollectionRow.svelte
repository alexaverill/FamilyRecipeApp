<script>
let {collections} = $props();

</script>

<div class="row">
{#each collections as collection}
<a href={`/collections/${collection.collectionId}`}>{collection.name}</a>
{/each}

</div>

<style>
a{
padding: .5rem 1rem .5rem 1rem;
border-radius:1rem;
background-color:lightgray;
color:black;
text-decoration:none;
&:hoveR{
background-color:darkgray;
}
}
</style>

