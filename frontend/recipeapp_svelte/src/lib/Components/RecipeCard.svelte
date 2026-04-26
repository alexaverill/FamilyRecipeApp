<script lang="ts">
  import { resolve } from "$app/paths";
  import IconImage from "./IconImage.svelte";

  let {
    id,
    name,
    contributor,
    collections,
    image,
  }: {
    id: string;
    name: string;
    contributor: string;
    collections: Array<any>;
    image: string;
  } = $props();
</script>

<a class="card" href={resolve(`/recipe/${id}`)}>
  <div class="imageContainer">
    {#if image && image.icon}
      <IconImage icon={image.icon} background={image.color} />
    {:else}
      <img src={image} />
    {/if}
  </div>
  <div class="content">
    <p class="title">{name}</p>
    <p>Contributed by {contributor}</p>
  </div>
</a>

<style>
  .card {
    border-radius: 0.5rem;
    border: 1px solid #ededed;
    text-decoration: none;
    color: black;
    &:visited {
      color: black;
    }
    img {
      border-radius: 0.5rem 0.5rem 0 0;
    }
    .content {
      padding: 0.5rem;
    }
    &:hover {
      background: #f6f6f6;
    }
    p {
      font-family: Inter;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
    }
    .title {
      font-family: Poppins;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1rem;
    }
  }
</style>
