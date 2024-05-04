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

<MetaTags title="zkFlex | Proof" />
<!-- Body -->
<Page>
  <div class="f-center flex-col gap-8 lg:w-[530px]">
    <div class="display-large-medium">Verify Proof 🤔</div>
    <div class="flex gap-2 w-full">
      <input
        class="input input-primary bg-white text-black w-full"
        placeholder="Verify Proof"
        bind:value={inputValue}
        on:input={handleInputChange} />

      <button class="btn">Verify</button>
    </div>
  </div>
</Page>
