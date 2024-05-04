<script lang="ts">
  import { Page } from '$components/Page';
  import { generateNounSVGMock } from '$libs/nouns';
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';

  let svgBase64 = '';
  let bg = '';

  function handleGenerate() {
    let { svg, background } = generateNounSVGMock();
    svgBase64 = svg;
    console.log('🚀 | handleGenerate | svgBase64:', svgBase64);
    bg = background;
    console.log('🚀 | handleGenerate | background:', background);
  }

  onMount(() => {
    handleGenerate();
  });
</script>

<svelte:head>
  <meta property="og:title" content="zkFlex" />
  <meta property="og:description" content="Your page description goes here." />
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="768" />
  <meta property="og:url" content="https://zkflex.xyz" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="zkFlex" />
  <meta name="twitter:description" content="Your page description goes here." />
</svelte:head>

<MetaTags title="zkFlex | Gallery" />

<!-- Body -->
<Page>
  <div class="f-center flex-col gap-2">
    <div class="display-large-medium">Gallery 🖼️</div>
    {#if svgBase64}
      <div>
        <!-- <img src={`data:image/svg+xml;base64,${svgBase64}`} alt="gallery" /> -->
        <svg width="300" viewBox="0 0 1024 768" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <!-- Circle -->
          <rect x="0" y="0" width="100%" height="100%" fill="#{bg}" />
          <image x="10" y="400" xlink:href="data:image/svg+xml;base64,{svgBase64}" />
          <text
            x="512"
            y="100"
            text-anchor="middle"
            fill="black"
            font-size="80"
            font-family="Londrina Solid"
            alignment-baseline="middle">@twittername is a certified</text>
          <text
            x="480"
            y="240"
            text-anchor="right"
            fill="black"
            font-size="144"
            font-family="Londrina Solid"
            alignment-baseline="middle">WHALE 🐳</text>
        </svg>
      </div>
    {/if}
    <button class="btn" on:click={handleGenerate}>Generate</button>
  </div>
</Page>
