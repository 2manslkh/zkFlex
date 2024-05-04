<script lang="ts">
  import type { FlexCard } from '$types';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { supabaseClient } from '$libs/supabase';
  import { base64_londrina_solid_font, base64_pepe_svg } from '$const';
  import { trimHash } from '$libs/util/hash';

  export let card: FlexCard;
  let { proofHash, twitterName, rank, tokenName } = card;

  let bg = '';
  let svgBase64 = '';
  let pepeBase64 = base64_pepe_svg;
  let svg = '';

  async function handleGenerate(hash: string) {
    // let { svg, background } = generateNounsSVG(trimHash(hash));
    let response = await fetch(`/noun/${trimHash(proofHash)}`);
    let { svg, background } = await response.json();
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
      const { data, error } = await supabaseClient.storage.from('ethsydney').upload(`${filename}.png`, svgData);

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
  onMount(async () => {
    await handleGenerate(proofHash);

    svg = `<svg
    id="${proofHash}"
    width="600"
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: 'Londrina Solid';
        src: url('data:font/woff;base64,${base64_londrina_solid_font}') format('woff');
      }
    </style>
    <rect x="0" y="0" width="100%" height="100%" fill="#${bg}" />
    <image x="10%" y="250" width="400" height="400" href="data:image/svg+xml;base64,${svgBase64}" />
    <image x="60%" y="280" width="300" height="400" href="data:image/svg+xml;base64,${pepeBase64}" />
    <text
      x="50%"
      y="100"
      text-anchor="middle"
      fill="black"
      font-size="80"
      font-family="Londrina Solid"
      alignment-baseline="middle">@${twitterName} is a certified</text>
    ${getRankComponent(rank)}
    </svg>`;

    // Create a new Image element
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // Set canvas size to match SVG dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw SVG onto canvas
      (ctx as CanvasRenderingContext2D).drawImage(img, 0, 0);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'fileName';
      saveSvgToSupabase(proofHash, dataUrl).then(() => {
        console.log('png saved');
      });
      // Programmatically trigger a click event on the link
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    };

    // Set the Image source to the SVG content
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    // saveSvgToSupabase(proofHash, svg).then(() => {
    //   console.log('svg saved');
    // });
  });
</script>

<div transition:fade={{ delay: 250, duration: 300 }}>
  <!-- <img src={svgDataUrl} alt="gallery" /> -->
  {@html svg}
</div>
