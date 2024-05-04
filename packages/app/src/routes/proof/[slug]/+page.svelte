<script lang="ts">
  import { Page } from '$components/Page';
  import type { PageServerData } from './$types';
  import { generateNounsSVG } from '$libs/nouns';
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { draftMessage } from '$libs/twitter';
  import { page } from '$app/stores';
  import FlexCard from '$components/FlexCard/FlexCard.svelte';
  import { supabaseClient } from '$libs/supabase';

  let svgBase64 = '';
  let bg = '';

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

  function handleGenerate(hash: string) {
    let { svg, background } = generateNounsSVG('0x' + hash);
    svgBase64 = svg;
    bg = background;
  }

  async function saveSvg() {
    console.log('asd');
    const svgElement = document.getElementById(data.hash);
    console.log('🚀 | saveSvg | svgElement:', svgElement);

    if (!svgElement) {
      return;
    }

    // Convert SVG to a data URL
    const svgXml = new XMLSerializer().serializeToString(svgElement);
    console.log('🚀 | saveSvg | svgXml:', svgXml);
    await saveSvgToSupabase(data.hash, svgXml);
  }
  export let data: PageServerData;
  onMount(() => {
    // add timeout to ensure the svg is rendered
    setTimeout(() => {}, 5000);
    // saveSvg().then(() => {
    //   console.log('svg saved');
    // });
  });
</script>

<MetaTags title="zkFlex | Proof" />
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-2 lg:w-[530px]">
    <div class="display-large-medium">ZK CERTIFIED ✅</div>
    <!-- <div class="display-medium">{data.tokenAddress}</div> -->
    <!-- <div class="body-bold">{data.proof}</div> -->
    <FlexCard
      card={{ twitterName: data.twitterName, rank: data.rank, tokenName: data.tokenAddress, proofHash: data.hash }} />

    <a href={draftMessage($page.url.toString())}>SHARE</a>
  </div>
</Page>
