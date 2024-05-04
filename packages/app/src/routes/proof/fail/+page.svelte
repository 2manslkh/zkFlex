<script lang="ts">
  import { Page } from '$components/Page';

  import { MetaTags } from 'svelte-meta-tags';

  let inputValue = '';
  // Update recommendations when input value changes
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    inputValue = target.value;
  }
</script>

<svelte:head>
  <meta property="og:title" content="zkFlex" />
  <meta property="og:description" content="My size is size." />
  <meta property="og:image" content="https://zkflex.lol/noun/a" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />
  <meta property="og:url" content="https://zkflex.lol" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="zkFlex" />
  <meta name="twitter:description" content="My size is size." />
  <meta name="twitter:image" content="https://zkflex.lol/noun/a" />
</svelte:head>

<MetaTags title="zkFlex | Proof" />
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-8 lg:w-[530px]">
    <div class="display-large-medium">LARPER ❌</div>
  </div>
</Page>
