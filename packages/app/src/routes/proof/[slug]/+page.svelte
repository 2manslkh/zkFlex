<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<svelte:head>
  <!-- Additional head tags -->
  <meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
  <!-- Additional head tags -->
</svelte:head>
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-2 lg:w-[530px]">
    <div class="display-large-medium">zkFlex💪💪💰</div>
    <div class="display-medium">{data.rank}</div>
    <div class="display-medium">{data.tokenAddress}</div>
    <div class="display-medium">{data.hash}</div>
    <div class="body-bold">{data.proof}</div>
  </div>
</Page>
