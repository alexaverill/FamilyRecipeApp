<script lang="ts">
  import { onMount } from "svelte";
	import { getCurrentUser } from "aws-amplify/auth";
      import { user } from "../lib/stores/authStore";
      import type { Snippet } from 'svelte'
      import {goto} from '$app/navigation';
	type Props = {
		children: Snippet;
	};

	let {
		children,
	}: Props = $props();



    onMount(async ()=>{
		try{
			$user = await getCurrentUser();
		}catch(e){
            console.log("Error!");
			console.log(e);
			goto("/login");
		}
    });
    </script>
{@render children()}
