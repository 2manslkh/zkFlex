<script>
  import { onMount } from 'svelte';
  let i = 0;
  let imageList = [];
  let currentImage = imageList[i];

  onMount(() => {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % imageList.length;
      currentImage = imageList[i];
    }, 500);
  });
</script>

<img src={currentImage} alt="NFT 1" class="size-40" />
