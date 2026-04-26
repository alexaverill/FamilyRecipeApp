<script>
import edit from "$lib/assets/edit.png"
let {option=$bindable(), color=$bindable(),photo=$bindable()} = $props();
let options=["10_burger.svg","11_cow.svg","12_bacon.svg","13_chicken.svg","14_shramp.svg","15_fish.svg","16_icecream.svg","17_cookie.svg","18_jar.svg","19_cocktail.svg","1_carrot.svg","20_utensils.svg","2_pepper.svg","3_leaf.svg","4_apple.svg","5_lemon.svg","6_egg.svg","7_wheat.svg","8_bread.svg","9_bowl.svg"];
let colors =[
    "#FF9F2F",
    "#3CCEE2",
    "#227C88",
    "#4DC643",
    "#FF5D8E",
    "#DD3F65",
    "#B955C2",
    "#7B3981",
  ];
let editing = $state(false);
</script>

<div class="icon" style:background-color={color ? color:colors[0] }>
<img src={`/images/${option ? option:options[0]}`}/>
  <button class="edit" onclick={()=>editing = !editing}><img src={edit}/></button>
  {#if editing}
    <div class="options">
    <div class="icons">
      {#each options as iconOption}
      <button onclick={()=>option = iconOption}><img src={`/images/filled/${iconOption}`}/></button>
{/each}
        {#each colors as iconColor}
      <button onclick={()=>color = iconColor}><div class="color" style:background-color={iconColor}/></button>
{/each}
    </div>
    </div>
{/if}
</div>
<style>
.icon{
position:relative;
width:200px;
height:200px;
border-radius:.5rem;
.edit{
background-color:white;
border-radius:50%;
position:absolute;
bottom:5px;
left:5px;
}
}
.options{
box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.75);
position:absolute;
top:200px;
left:0;
background-color:white;
width:135px;
padding:.5rem;
.icons{
display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: .25rem;
button{
padding:0;
width:30px; height:30px;
img{
width:100%;
height:100%;
}
.color{
width:100%;
height:100%;
}
}
}
}
</style>
