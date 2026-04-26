<script lang="ts">
  let { icon, background }: { icon: string; background: string } = $props();
</script>

<div class="image" style:background-color={background}>
  <img src={`/images/${icon}`} />
</div>

<style>
  .image {
    min-width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
    img {
      width: 60%;
    }
  }
</style>
