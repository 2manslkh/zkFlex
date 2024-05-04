<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';
  import { generateNounsSVG } from '$libs/nouns';
  import pepe from '$images/pepe.svg';
  import { onMount } from 'svelte';

  let svgBase64 = '';
  let bg = '';

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG('0x'+hash);
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
    <div class="display-medium">{data.tokenAddress}</div>
    <div class="body-bold">{data.proof}</div>
    {#if svgBase64}
    <div>
      <!-- <img src={`data:image/svg+xml;base64,${svgBase64}`} alt="gallery" /> -->
      <svg width="300" viewBox="0 0 1024 768" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <!-- Circle -->
        <rect x="0" y="0" width="100%" height="100%" fill="#{bg}" />
        <image x="10" y="300"  width="400" height="400" xlink:href="data:image/svg+xml;base64,{svgBase64}" />
        <image x="600" y="350" width="300" height="400"  xlink:href="{pepe}" />
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
          alignment-baseline="middle">{data.tokenAddress} WHALE  🐳</text>
        {/if}
        {#if data.rank.toLowerCase() === 'shrimp'}
        <text
        x="180"
        y="240"
        text-anchor="right"
        fill="black"
        font-size="144"
        font-family="Londrina Solid"
        alignment-baseline="middle">{data.tokenAddress} SHRIMP  🦐</text>
        {/if}
        {#if data.rank.toLowerCase() === 'dolphin'}
        <text
        x="50"
        y="240"
        text-anchor="right"
        fill="black"
        font-size="144"
        font-family="Londrina Solid"
        alignment-baseline="middle">{data.tokenAddress} DOLPHIN  🐬</text>
      {/if}
      </svg>
    </div>
  {/if}
  </div>
</Page>
