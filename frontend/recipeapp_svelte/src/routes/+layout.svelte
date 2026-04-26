<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../style.css";
  import { fetchAuthSession } from "aws-amplify/auth";
  import { onMount } from "svelte";
  import { Amplify } from "aws-amplify";
  import { session, user } from "$lib/stores/authStore";
  import { GetRecipes } from "$lib/API/RecipeApi";
  import { recipeStore } from "$lib/stores/recipestore";
  import { resolve } from "$app/paths";
  import { getCurrentUser } from "aws-amplify/auth";
  import { goto } from "$app/navigation";
  let { children } = $props();
  onMount(async () => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolClientId: import.meta.env.VITE_POOL_CLIENT_ID,
          userPoolId: import.meta.env.VITE_USERPOOL_ID,
        },
      },
    });
    try {
      $session = await fetchAuthSession();
      let currentUser = await getCurrentUser();
      $user = { username: currentUser.username, userId: currentUser.userId };
      console.log($user);

      let recipes = await GetRecipes();
      //deal with caching
      $recipeStore = recipes;
    } catch (e) {
      console.log(e);
      goto(resolve("/login"));
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<div class="header">
  <div class="left">
    <a class="title" href={resolve("/")}>Family Recipe App</a>
    <a class="link" href={resolve("/")}>Cook Book</a>
    <!--<a class="link" href="./plan">Meal Plans</a>-->
    <a class="link" href={resolve("/collections")}>Collections</a>
  </div>
  <div class="right">
    <a href="./favorites" class="link">Favorites</a>
  </div>
</div>
<div class="content">
  <div class="container">
    {@render children()}
  </div>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  .container {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    min-height: 56px;
    display: flex;
    background-color: #227c88;
    padding: 0.1rem 1.5rem;
    justify-content: space-between;
    align-items: center;
    .link {
      font-family: Poppins;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: white;
      text-decoration: none;
      a:hover {
        color: lightgray;
      }
    }
    .left {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
  }

  .title {
    color: #fff;
    font-family: Poppins;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration: none;
    color: #fff;
    &:hover {
      color: lightgray;
    }
  }
</style>
