<script lang="ts">
  import { FlexCard } from '$components/FlexCard';
  import type { FlexCard as FlexCardType } from '$types';
  import { Page } from '$components/Page';
  import { generateNounSVGMock } from '$libs/nouns';
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { MOCK_CARDS } from '../../mocks/users';
  import { keccak256, numberToHex } from 'viem';

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

<MetaTags title="zkFlex | Gallery" />

<!-- Body -->
<Page>
  <div class="f-center flex-col self-start gap-5">
    <div class="flex gap-6 items-center">
      <div class="display-large-medium">Gallery 🖼️</div>
      <button class="btn" on:click={handleAddMore}>Generate</button>
    </div>

    <div class="flex flex-wrap gap-2">
      {#each cards as _card}
        <FlexCard card={_card} />
      {/each}
    </div>
  </div>
</Page>
