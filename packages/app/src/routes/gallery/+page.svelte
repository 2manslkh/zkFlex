<script lang="ts">
  import { FlexCard } from '$components/FlexCard';
  import type { FlexCard as FlexCardType } from '$types';
  import { Page } from '$components/Page';
  import { MetaTags } from 'svelte-meta-tags';
  import { MOCK_CARDS } from '../../mocks/users';
  import { keccak256, numberToHex } from 'viem';
  import { page } from '$app/stores';

  let cards: FlexCardType[] = MOCK_CARDS;
  $: cards;

  function handleAddMore() {
    let newCard: FlexCardType = {
      rank: 'shark',
      twitterName: 'newguy',
      tokenName: 'PEPE',
      proofHash: keccak256(numberToHex(Math.round(Math.random() * 1000))),
    };

    cards = [...cards, newCard];
  }
</script>

<!-- <MetaTags title="zkFlex | Gallery" /> -->

  <svelte:head>
    <title>zkFlex | Gallery</title>
    <meta property="og:title" content="zkFlex" />
    <meta property="og:description" content="My size is size." />
    <meta property="og:image" content="https://zkflex.lol/noun/a" />
    <meta property="og:url" content="https://zkflex.lol" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="zkFlex" />
    <meta name="twitter:description" content="My size is size." />
    <meta name="twitter:image" content="https://zkflex.lol/noun/a" />
  </svelte:head>
<!-- Body -->
<Page>
  <div class="f-center flex-col self-start gap-5">
    <div class="flex gap-6 items-center">
      <div class="display-large-medium">Gallery 🖼️</div>
      <button class="btn" on:click={handleAddMore}>Generate</button>
    </div>

    <div class="flex flex-wrap items-center justify-center flex-grow gap-2 max-h-[600px] overflow-y-scroll">
      {#each cards as _card}
        <FlexCard card={_card} />
      {/each}
    </div>
  </div>
</Page>
