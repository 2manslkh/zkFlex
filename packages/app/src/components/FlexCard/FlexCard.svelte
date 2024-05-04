<script lang="ts">
  import type { FlexCard } from '$types';
  import pepe from '$images/pepe.svg';
  import { onMount } from 'svelte';
  import { generateNounsSVG } from '$libs/nouns';
  import { trimHash } from '$libs/util/hash';
  import { fade } from 'svelte/transition';
  import { supabaseClient } from '$libs/supabase';
  import { base64_londrina_solid_font, base64_pepe_svg } from '$const';

  export let card: FlexCard;
  let { proofHash, twitterName, rank, tokenName } = card;

  let bg = '';
  let svgBase64 = '';
  let pepeBase64 = base64_pepe_svg;
  let svg = '';

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG(trimHash(hash));
    svgBase64 = svg;
    bg = background;
  }

  function getRankComponent(rank: string) {
    switch (rank.toLowerCase()) {
      case 'whale':
        return `<text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="144"
        font-family="Londrina Solid"
        alignment-baseline="middle">${tokenName} WHALE 🐳</text>`;
      case 'shark':
        return `<text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="120"
        font-family="Londrina Solid"
        alignment-baseline="middle">${tokenName} SHARK 🦈</text>`;
      case 'dolphin':
        return `<text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="100"
        font-family="Londrina Solid"
        alignment-baseline="middle">${tokenName} DOLPHIN 🐬</text>`;
      case 'shrimp':
        return `<text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="80"
        font-family="Londrina Solid"
        alignment-baseline="middle">${tokenName} SHRIMP 🦐</text>`;
      case 'ghost':
        return `<text
        x="50%"
        y="240"
        text-anchor="middle"
        fill="black"
        font-size="60"
        font-family="Londrina Solid"
        alignment-baseline="middle">${tokenName} GHOST 👻</text>`;
      default:
        return '';
    }
  }

  // Function to save SVG to Supabase storage
  async function saveSvgToSupabase(filename: string, svgData: string) {
    try {
      // Upload SVG to Supabase storage
      const { data, error } = await supabaseClient.storage.from('ethsydney').upload(`${filename}.svg`, svgData);

      if (error) {
        console.error('Error uploading SVG to Supabase:', error.message);
      } else {
        console.log('SVG uploaded successfully');
      }
    } catch (error) {
      console.error('Error:');
    }
  }
  let svgDataUrl = '';
  onMount(() => {
    handleGenerate(proofHash);

    svg = `<svg
    id="${proofHash}"
    width="300"
    viewBox="0 0 1024 768"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: 'Londrina Solid';
        src: url('data:font/woff;base64,${base64_londrina_solid_font}') format('woff');
      }
    </style>
    <rect x="0" y="0" width="100%" height="100%" fill="#${bg}" />
    <image x="10" y="300" width="400" height="400" href="data:image/svg+xml;base64,${svgBase64}" />
    <image x="600" y="350" width="300" height="400" href="data:image/svg+xml;base64,${pepeBase64}" />
    <text
      x="512"
      y="100"
      text-anchor="middle"
      fill="black"
      font-size="80"
      font-family="Londrina Solid"
      alignment-baseline="middle">@${twitterName} is a certified</text>
    ${getRankComponent(rank)}
    </svg>`;
    console.log('🚀 | onMount | svg:', svg);
    console.log('🚀 | onMount | svgDataUrl:', svgDataUrl);

    // Set the Image source to the SVG content
    saveSvgToSupabase(proofHash, svg).then(() => {
      console.log('svg saved');
    });
  });

  function textToHtml(text: string) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.firstChild;
  }

  const htmlElement = textToHtml(svg);

  // Now you can append `htmlElement` to your document or manipulate it as needed
  //   document.body.appendChild(htmlElement);
</script>

<div transition:fade={{ delay: 250, duration: 300 }}>
  <!-- <img src={htmlElement} alt="gallery" /> -->
  {@html svg}
</div>
