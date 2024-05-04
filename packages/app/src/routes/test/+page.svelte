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
  <title>zkFlex - Gallery</title>
  <!-- HTML Meta Tags -->
  <title></title>
  <meta name="description" content="" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://zk-flex.vercel.app/gallery" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <!--
  You can generate this image URL dynamically: https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/{site_text}/{title_text}/{image_url}/og.png
  Replace the variables in the brackets with your own values and use this URL in the image tag below this comment. Ensure values are URL encoded.
  For more information, read: https://www.opengraph.xyz/blog/how-to-implement-dynamic-open-graph-images
-->
  <meta
    property="og:image"
    content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/zk-flex.vercel.app/Get%20On%20Board%20Meta%20Ads%20Campaigns/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%3Ftoken%3DFORiB3YuXMB9HERtclPAWWBLMSBisufr3mJbjlWtsrQ%26height%3D800%26width%3D1200%26expires%3D33239445186/og.png" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="zk-flex.vercel.app" />
  <meta property="twitter:url" content="https://zk-flex.vercel.app/gallery" />
  <meta name="twitter:title" content="" />
  <meta name="twitter:description" content="" />
  <!--
  You can generate this image URL dynamically: https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/{site_text}/{title_text}/{image_url}/og.png
  Replace the variables in the brackets with your own values and use this URL in the image tag below this comment. Ensure values are URL encoded.
  For more information, read: https://www.opengraph.xyz/blog/how-to-implement-dynamic-open-graph-images
-->
  <meta
    name="twitter:image"
    content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/zk-flex.vercel.app/Get%20On%20Board%20Meta%20Ads%20Campaigns/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%3Ftoken%3DFORiB3YuXMB9HERtclPAWWBLMSBisufr3mJbjlWtsrQ%26height%3D800%26width%3D1200%26expires%3D33239445186/og.png" />

  <!-- Meta Tags Generated via https://www.opengraph.xyz -->
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
