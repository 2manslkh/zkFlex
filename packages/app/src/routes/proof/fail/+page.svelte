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
    <div class="display-large-medium">LARPER ❌</div>
  </div>
</Page>
