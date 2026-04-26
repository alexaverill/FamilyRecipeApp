<script lang="ts">
  import { fetchAuthSession, getCurrentUser, signIn } from "aws-amplify/auth";
  import { goto } from "$app/navigation";
  import { session, user } from "$lib/stores/authStore";
  import { GetRecipes } from "$lib/API/RecipeApi";
  import { recipeStore } from "$lib/stores/recipestore";
  let username: string;
  let password: string;
  let error: string = "";
  const login = () => {
    signIn({
      username: username,
      password: password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    })
      .then(async (result) => {
        console.log(result);

        $session = await fetchAuthSession();
        let currentUser = await getCurrentUser();
        $user = { username: currentUser.username, userId: currentUser.userId };
        console.log($user);
        let recipes = await GetRecipes();
        //deal with caching
        $recipeStore = recipes;

        goto("/");
      })
      .catch((err) => {
        console.log(err);
        // Something is Wrong
      });
  };
</script>

<div class="column page">
  <h1>Login</h1>

  <div class="column login">
    <label>Username: <input type="text" bind:value={username} /></label>
    <label>Password: <input type="password" bind:value={password} /></label>
    {error}
    <button class="primary" onclick={login}>Login</button>
  </div>
</div>

<style>
  .page {
    align-items: center;
    gap: 2rem;
  }
  .login {
    label {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }
    gap: 1.5rem;
  }
  input {
    padding: 0.25rem;
  }
</style>
