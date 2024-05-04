<script lang="ts">
  import { Page } from '$components/Page';
  import { generateNounSVGMock } from '$libs/nouns';
  import { onMount } from 'svelte';

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
  <!-- HTML Meta Tags -->
  <title>Title</title>
  <meta name="description" content="Description" />
  <meta property="og:url" content="https://zkflex.lol/test" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Title" />
  <meta property="og:description" content="Description" />
  <meta
    property="og:image"
    content="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4JmubmYDJnFtstwHbaZPev/23caf8c05363419bb2b94c6c53299cb0/og-dark.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="zkflex.lol" />
  <meta property="twitter:url" content="https://zkflex.lol/test" />
  <meta name="twitter:title" content="Title" />
  <meta name="twitter:description" content="Description" />
  <meta
    name="twitter:image"
    content="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4JmubmYDJnFtstwHbaZPev/23caf8c05363419bb2b94c6c53299cb0/og-dark.png" />
</svelte:head>

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
