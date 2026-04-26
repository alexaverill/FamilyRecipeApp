<script lang="ts">
  let { image, background }: { image: string; background: string } = $props();
</script>

<div class="imageContainer" style:background-color={background}>
  <img src={`/images/${image}`} />
</div>

<style>
  .imageContainer {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
  }
</style>
