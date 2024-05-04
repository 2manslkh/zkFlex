<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import { draftMessage } from '$libs/twitter';
  import { page } from '$app/stores';
  import FlexCard from '$components/FlexCard/FlexCard.svelte';

  export let data: PageServerData;
</script>

<svelte:head>
  <!-- HTML Meta Tags -->
  <title>zkFlex | Proof</title>
  <meta name="description" content="My size is size." />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://zkflex.lol/proof/${$page.params.slug}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="zkFlex | Proof" />
  <meta property="og:description" content="My size is size." />
  <meta property="og:image" content="https://zkflex.lol/noun/render/${$page.params.slug}" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="zkflex.lol" />
  <meta property="twitter:url" content="https://zkflex.lol/proof/${$page.params.slug}" />
  <meta name="twitter:title" content="zkFlex | Proof" />
  <meta name="twitter:description" content="My size is size." />
  <meta name="twitter:image" content="https://zkflex.lol/noun/render/${$page.params.slug}" />
</svelte:head>

<!-- Body -->
<Page>
  <div class="f-center flex-col gap-2 lg:w-[530px]">
    <div class="display-large-medium">ZK CERTIFIED ✅</div>
    <div class="flex w-full gap-2">
      <textarea class="text-black text-[8px] w-full px-4 py-1 rounded-xl">
        {data.proof}
      </textarea>
      <button class="btn">Verify</button>
      <button class="btn">See Verifier</button>
    </div>

    <FlexCard
      card={{ twitterName: data.twitterName, rank: data.rank, tokenName: data.tokenAddress, proofHash: data.hash }} />

    <a class="btn" href={draftMessage($page.url.toString())}>Share on X</a>
  </div>
</Page>
