<script>
import {parseRecipe} from "$lib/utilities/parseRecipe.js"
 import { user } from "$lib/stores/authStore";

let title,recipe = null;
let error = $state()
const importRecipe = async (e)=>{
console.log("Importing Recipe");
  let parsedRecipe = parseRecipe(recipe);
  console.log(parsedRecipe)
  if(parsedRecipe.error){
    error=parsedRecipe.error;
  }
    let eventObj = {
      userId: $user.userId,
      recipeId: null,
      parentId: null,
      title,
      description: "",
      source: "",
      ingredients: parsedRecipe.ingredients,
      steps: parsedRecipe.steps,
      notes: "",
      user,
      image: { icon: "20_utensils.svg", color: "#4DC643" },
    };
    let data = await CreateRecipe(eventObj);}
</script>

<div class="column content">
  <div class="column">
  <h1> Import Recipe</h1>
  <p>Seperate the ingredients and the steps with <strong>@@@</strong></p>
    {#if error}
<strong>{error}</strong>
{/if}
  </div>
    <input type="text" bind:value={title} placeholder="Recipe Name"/>

<textarea bind:value={recipe}/>


<button onclick={importRecipe} class="primary">Import</button>


</div>

<style>
.content{
gap:1rem;
width:90%;
}
input{
padding:.5rem;
}
textarea{
width:100%;
min-height:250px;
}
</style>
