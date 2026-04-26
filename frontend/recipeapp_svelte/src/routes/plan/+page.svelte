<script>
  import { resolve } from "$app/paths";
  import { GetPlans } from "$lib/API/PlanApi";
  import { user } from "$lib/stores/authStore";
  import { onMount } from "svelte";

  let plans = $state();
  let loading = $state();

  onMount(async () => {
    loading = true;
    let allPlans = await GetPlans({ userId: $user.userId });
    plans = [...allPlans.plans, ...allPlans.shared];
    loading = false;
  });
</script>

<h1>Meal Planning!</h1>
{#if !loading}
  {#each plans as plan}
    <a href={resolve(`/plan/${plan.planId}`)}>{plan.title}</a>
  {/each}
{:else}
  <h2>Loading...</h2>
{/if}
