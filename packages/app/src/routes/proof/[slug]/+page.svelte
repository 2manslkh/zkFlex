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
  <title>zkFlex | Proof</title>
  <meta property="og:image" content={`https://uxxmxcbidkgoeortjpsx.supabase.co/storage/v1/object/public/ethsydney/${$page.params.slug}.png`} />
  <meta property="og:title" content="zkFlex | Proof" />
  <meta property="og:description" content="My size is size." />
  <meta property="og:url" content="https://zkflex.lol" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="zkFlex | Proof" />
  <meta name="twitter:description" content="My size is size." />
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
