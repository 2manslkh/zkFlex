<script lang="ts">
  import type { FlexType } from '$types';

  export let bg = '#000000';
  export let svgBase64 = '';
  export let twitterName = 'twittername';
  export let flexStatus: FlexType = 'whale';
</script>

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
      alignment-baseline="middle">@{twitterName} is a certified</text>
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
