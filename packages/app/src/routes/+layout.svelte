<script lang="ts">
  import '../app.css';
  import { Responsiveness } from '$components/Responsiveness';
  import { onDestroy, onMount } from 'svelte';
  import { TopNavBar } from '$components/TopNavBar';
  import { Footer } from '$components/Footer';
  import { Toasts } from '$components/Toast';
  import { startWatching, stopWatching } from '$libs/wagmi';
  import { startWatching as startWatchingX } from '$libs/supabase';
  import { WalletConnect } from '$components/Web3';
  import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';

  onMount(() => {
    // Set theme
    // localStorage.setItem('theme', 'light');
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', 'dark'); // Set default theme
    startWatching();
    startWatchingX();
  });

  onDestroy(() => {
    stopWatching();
  });
</script>

<!-- <Metatags /> -->
<!-- Comment to Disable WEB3 (Requires PUBLIC_WALLETCONNECT_PROJECT_ID to work) -->
{#if PUBLIC_WALLETCONNECT_PROJECT_ID}
  <WalletConnect />
{/if}

<Toasts />
<Responsiveness />
<WalletConnect />

<div
  class="flex flex-col relative top-0 w-full items-center justify-center bg-base-300 border-b border-b-black min-w-[330px]">
  <TopNavBar />
</div>
<div class="flex flex-col justify-between h-screen min-w-[330px]">
  <slot />
  <!-- Footer -->
  <div class=" flex flex-col w-full items-center justify-center">
    <Footer />
  </div>
</div>
