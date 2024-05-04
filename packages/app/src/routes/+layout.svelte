<script lang="ts">
  import '../app.css';
  import { Responsiveness } from '$components/Responsiveness';
  import { onDestroy, onMount } from 'svelte';
  import { TopNavBar } from '$components/TopNavBar';
  import { Footer } from '$components/Footer';
  import { Toasts } from '$components/Toast';
  import { startWatching, stopWatching } from '$libs/wagmi';
  import { WalletConnect } from '$components/Web3';
  import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
  import { MetaTags } from 'svelte-meta-tags';

  onMount(() => {
    // Set theme
    // localStorage.setItem('theme', 'light');
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', 'dark'); // Set default theme
    startWatching();
  });

  onDestroy(() => {
    stopWatching();
  });
</script>

<MetaTags
  titleTemplate="zkFlex | Home"
  description="My size is size."
  canonical="https://zkflex.lol"
  openGraph={{
    url: '"https://zkflex.lol',
    title: 'zkFlex',
    description: 'My size is size.',
    images: [
      {
        url: 'https://zkflex.lol/noun/a',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: 'https://zkflex.lol/noun/a',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second',
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' },
    ],
    siteName: 'SiteName',
  }}
  twitter={{
    handle: '@zkflex',
    site: '@zkflex',
    cardType: 'summary_large_image',
    title: 'zkFlex',
    description: 'My size is size.',
    image: 'https://zkflex.lol/noun/a',
    imageAlt: 'size',
  }} />

<!-- Comment to Disable WEB3 (Requires PUBLIC_WALLETCONNECT_PROJECT_ID to work) -->
{#if PUBLIC_WALLETCONNECT_PROJECT_ID}
  <WalletConnect />
{/if}

<Toasts />
<Responsiveness />
<WalletConnect />

<div class="flex flex-col relative top-0 w-full items-center justify-center bg-base-300 border-b border-b-black">
  <TopNavBar />
</div>
<div class="flex flex-col justify-between h-screen">
  <slot />
  <!-- Footer -->
  <div class=" flex flex-col w-full items-center justify-center">
    <Footer />
  </div>
</div>
