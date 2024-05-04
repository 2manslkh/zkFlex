<script lang="ts">
  import type { FlexCard } from '$types';
  import pepe from '$images/pepe.svg';
  import { onMount } from 'svelte';
  import { generateNounsSVG } from '$libs/nouns';
  import { trimHash } from '$libs/util/hash';

  export let card: FlexCard;
  let { proofHash, twitterName, rank, tokenName } = card;

  let bg = '';
  let svgBase64 = '';

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG(trimHash(hash));
    svgBase64 = svg;
    bg = background;
  }
  onMount(() => {
    handleGenerate(proofHash);
  });
</script>

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
      alignment-baseline="middle">@{twitterName} is a certified</text>
    {#if rank.toLowerCase() === 'whale'}
      <text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="144"
        font-family="Londrina Solid"
        alignment-baseline="middle">{tokenName} WHALE 🐳</text>
    {/if}
    {#if rank.toLowerCase() === 'shark'}
      <text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="120"
        font-family="Londrina Solid"
        alignment-baseline="middle">{tokenName} SHARK 🦈</text>
    {/if}
    {#if rank.toLowerCase() === 'dolphin'}
      <text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="100"
        font-family="Londrina Solid"
        alignment-baseline="middle">{tokenName} DOLPHIN 🐬</text>
    {/if}
    {#if rank.toLowerCase() === 'shrimp'}
      <text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="80"
        font-family="Londrina Solid"
        alignment-baseline="middle">{tokenName} SHRIMP 🦐</text>
    {/if}
    {#if rank.toLowerCase() === 'ghost'}
      <text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="60"
        font-family="Londrina Solid"
        alignment-baseline="middle">{tokenName} GHOST 👻</text>
    {/if}
  </svg>
</div>
