<script lang="ts">
  // Count up to value using svelte spring
  import { spring } from 'svelte/motion';
  import type { FlexType } from '../../types/types';
  export let rank: FlexType = 'ghost';

  function rankToPointMap(rank: FlexType) {
    switch (rank) {
      case 'shrimp':
        return 25;
      case 'dolphin':
        return 50;
      case 'shark':
        return 75;
      case 'whale':
        return 100;
      default:
        return 1;
    }
  }
  export let value = rankToPointMap(rank);
  export let maxValue = 100;
  let countSpring = spring(0, { stiffness: 0.04, damping: 1, precision: 0.001 });

  $: countSpring.update(() => value);
</script>

<progress class={$$props.class} value={$countSpring.toFixed(0)} max={maxValue}> </progress>
