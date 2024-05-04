<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<svelte:head>
  <!-- Additional head tags -->
  <meta property="og:type" content="en_US" />
  <meta property="website" content="website" />
  <meta property="og:title" content="ZK Flex" />
  <meta property="og:description" content="Flex your size" />
  <meta property="og:url" content="https://zk-flex.vercel.app" />
  <meta property="og:site_name" content="ZK Flex" />
  <meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@ZKFlex" />
  <meta name="twitter:url" content="https://twitter.com/zkflex" />
  <meta name="twitter:title" content="ZK Flex" />
  <meta name="twitter:description" content="Flex your size" />
  <meta charset="utf-8" />
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
