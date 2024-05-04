<script lang="ts">
  import { goto } from '$app/navigation';
  import { Page } from '$components/Page';
  import { verifyProof } from '$libs/zk';
  import { MetaTags } from 'svelte-meta-tags';
  let inputValue = '';
  // Update recommendations when input value changes
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    inputValue = target.value;
  }

  async function handleVerifyProof() {
    try {
      let isVerified = await verifyProof(inputValue);
      if (isVerified === false) {
        goto('/proof/fail');
        return;
      }

      //TODO: @bennettyong get hash of proof and redirect
      let proofHash = '1234';

      goto(`/proof/${proofHash}`);
    } catch (error) {
      goto('/proof/fail');
    }
  }
</script>

<MetaTags title="zkFlex | Proof" />
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-8 lg:w-[530px]">
    <div class="display-large-medium">Verify Proof 🤔</div>
    <div class="flex gap-2 w-full">
      <textarea
        class="input input-primary p-2 bg-white text-black w-full"
        placeholder="enter proof..."
        bind:value={inputValue} />

      <button on:click={handleVerifyProof} class="btn">Verify</button>
    </div>
  </div>
</Page>
