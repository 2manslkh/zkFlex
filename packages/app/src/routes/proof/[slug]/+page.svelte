<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';
  import { generateNounsSVG } from '$libs/nouns';
  import pepe from '$images/pepe.svg';
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { draftMessage } from '$libs/twitter';
  import { page } from '$app/stores';

  let svgBase64 = '';
  let bg = '';

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG('0x' + hash);
    svgBase64 = svg;
    console.log('🚀 | handleGenerate | svgBase64:', svgBase64);
    bg = background;
    console.log('🚀 | handleGenerate | background:', background);
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
    <div class="display-medium">{data.tokenAddress}</div>
    <div class="body-bold">{data.proof}</div>
    {#if svgBase64}
      <div>
        <!-- <img src={`data:image/svg+xml;base64,${svgBase64}`} alt="gallery" /> -->
        <svg width="300" viewBox="0 0 1024 768" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <!-- Circle -->
          <rect x="0" y="0" width="100%" height="100%" fill="#{bg}" />
          <image x="10" y="300" width="400" height="400" xlink:href="data:image/svg+xml;base64,{svgBase64}" />
          <image x="600" y="350" width="300" height="400" xlink:href={pepe} />
          <text
            x="512"
            y="100"
            text-anchor="middle"
            fill="black"
            font-size="80"
            font-family="Londrina Solid"
            alignment-baseline="middle">@{data.twitterName} is a certified</text>
          {#if data.rank.toLowerCase() === 'whale'}
            <text
              x="130"
              y="240"
              text-anchor="right"
              fill="black"
              font-size="144"
              font-family="Londrina Solid"
              alignment-baseline="middle">{data.tokenAddress} WHALE 🐳</text>
          {/if}
          {#if data.rank.toLowerCase() === 'shrimp'}
            <text
              x="180"
              y="240"
              text-anchor="right"
              fill="black"
              font-size="144"
              font-family="Londrina Solid"
              alignment-baseline="middle">{data.tokenAddress} SHRIMP 🦐</text>
          {/if}
          {#if data.rank.toLowerCase() === 'dolphin'}
            <text
              x="50"
              y="240"
              text-anchor="right"
              fill="black"
              font-size="144"
              font-family="Londrina Solid"
              alignment-baseline="middle">{data.tokenAddress} DOLPHIN 🐬</text>
          {/if}
        </svg>
      </div>
    {/if}

    <a href={draftMessage($page.url.toString())}>SHARE</a>
  </div>
</Page>
