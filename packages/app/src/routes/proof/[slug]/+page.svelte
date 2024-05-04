<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';
  import { generateNounsSVG } from '$libs/nouns';
  import pepe from '$images/pepe.svg';
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { draftMessage } from '$libs/twitter';
  import { page } from '$app/stores';
  import FlexCard from '$components/FlexCard/FlexCard.svelte';

  let svgBase64 = '';
  let bg = '';

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG('0x' + hash);
    svgBase64 = svg;
    bg = background;
  }
  export let data: PageServerData;
  onMount(() => {
    handleGenerate(data.hash);
  });
</script>

<MetaTags title="zkFlex | Proof" />
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-2 lg:w-[530px]">
    <div class="display-large-medium">ZK CERTIFIED ✅</div>
    <!-- <div class="display-medium">{data.tokenAddress}</div> -->
    <!-- <div class="body-bold">{data.proof}</div> -->
    {#if svgBase64}
      <FlexCard
        card={{ twitterName: data.twitterName, rank: data.rank, tokenName: data.tokenAddress, proofHash: data.hash }} />
    {/if}

    <a href={draftMessage($page.url.toString())}>SHARE</a>
  </div>
</Page>
