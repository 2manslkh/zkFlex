<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { readable, writable } from 'svelte/store';
  import { MOCK_TOKENS } from '../../mocks';
  import type { Token } from '$types';
  import { shortenAddress } from '$libs/util/shortenAddress';

  const dispatch = createEventDispatcher();

  let inputValue = '';
  let recommendations = writable<Token[]>([]);
  let hideDropdown = false;

  // Mock data for recommendations
  const mockRecommendations: Token[] = Object.values(MOCK_TOKENS);

  // Function to filter recommendations based on input value
  function filterRecommendations(value: string) {
    let searchTerm = value.toLowerCase();
    let filtered = [];
    for (const [address, token] of Object.entries(MOCK_TOKENS)) {
      const { name, symbol, address } = token;
      if (
        name.toLowerCase().includes(searchTerm) ||
        symbol.toLowerCase().includes(searchTerm) ||
        address.toLowerCase().includes(searchTerm)
      ) {
        // return address;
        filtered.push(MOCK_TOKENS[address]);
      }
    }

    return filtered; // Return null if no match found
  }

  // Update recommendations when input value changes
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    inputValue = target.value;
    $recommendations = filterRecommendations(inputValue);
    hideDropdown = false; // Show dropdown when input changes
  }

  // Handle selection from dropdown
  function handleSelect(item: string) {
    inputValue = item;
    hideDropdown = true;
    console.log('asd');
    dispatch('search', { address: item });
  }

  // Initialize recommendations on component mount
  onMount(() => {
    filterRecommendations(inputValue);
  });
</script>

<!-- Using DaisyUI components -->
<div class="relative w-full">
  <div class="dropdown w-full mb-2">
    <input
      class="input input-primary bg-white text-black w-full"
      placeholder="Search Token"
      bind:value={inputValue}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          handleSelect(inputValue);
        }
      }}
      on:input={handleInputChange} />
    <ul
      class=" flex dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full {hideDropdown
        ? 'hidden'
        : ''}">
      {#each $recommendations as recommendation}
        <li class="p-2 hover:text-secondary cursor-pointer w-full">
          <button on:click={() => handleSelect(recommendation.address)}>
            <div class="flex gap-2 items-center">
              <div class="avatar">
                <div class="size-4">
                  <img src={recommendation.logoURI} alt="logo" />
                </div>
              </div>
              {recommendation.name}
              {shortenAddress(recommendation.address, 10, 8)}
            </div></button>
        </li>
      {/each}
    </ul>
  </div>
</div>
