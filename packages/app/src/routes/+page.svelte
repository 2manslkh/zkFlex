<script lang="ts">
  import Search from '$components/Input/Search.svelte';
  import { Page } from '$components/Page';
  import { redirect } from '@sveltejs/kit';
  import type { FlexType, Token } from '$types';
  import { formatEther, parseEther, signatureToCompactSignature } from 'viem';
  import TwitterLogo from '$images/twitter.png';
  import { MOCK_TOKENS, MOCK_BALANCES } from '$mocks';
  import { account } from '$stores/stores';
  import { ConnectWalletButton } from '$components/Button';
  import { MetaTags } from 'svelte-meta-tags';
  import { goto } from '$app/navigation';
  import { SupabaseLogin } from '$components/Supabase';
  import { twitterUsername } from '$stores/supabase';
  import { supabaseClient } from '$libs/supabase';
  import { createConfig, getAccount, getBalance, signMessage } from '@wagmi/core';
  import { wagmiConfig } from '$libs/wagmi';
  import { calculateUserRank } from '$libs/util/calculateUserStatus';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import sizeissize from '$images/yoursizeisnotsize.png';
  import { fade } from 'svelte/transition';

  let searching = false;
  let assetBalance: string = '0';
  let token: Token;

  let holderStatus: FlexType = 'ghost';

  $: holderStatus = calculateUserRank(assetBalance);

  let signature: string;
  $: signature;

  async function handle(event: any) {
    token = MOCK_TOKENS[event.detail.address];
    searching = true;
    const balance = await getBalance(wagmiConfig, {
      token: event.detail.address,
      address: $account.address as any,
    });
    assetBalance = formatEther(balance.value);
    searching = false;
  }
  async function fetchData() {
    // Get user signature
    signature = await signMessage(wagmiConfig, {
      message: 'Proof of ownership',
    });

    try {
      searching = true;
      const requestBody = {
        message: 'Proof of ownership',
        twitterName: $twitterUsername,
        address: $account.address,
        signature: signature,
        tokenAddress: token.address,
        symbol: token.symbol,
      };
      const response = await fetch('https://zkflex.onrender.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log('🚀 | fetchData | data:', data);

      if (data.hash) {
        goto('/proof/' + data.hash);
      } else {
        throw new Error('Error generating proof');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      searching = false;
    }
  }
  function handleSupabaseLogout() {
    supabaseClient.auth.signOut({ scope: 'global' });
  }
</script>

<MetaTags title="zkFlex | Home" />

<!-- Body -->
<Page>
  <div class="flex flex-col gap-6 lg:w-[530px] h-full items-center">
    <div class="f-center flex-col gap-2 pb-2 pt-10">
      <div class="display-large-medium">zkFlex💪💪💰</div>
      {#if !token}
        <img transition:fade={{ delay: 250, duration: 300 }} src={sizeissize} alt="doknwon" />
      {/if}

      <div class="body-bold">Show that your size is size.</div>
    </div>
    {#if $account?.isConnected}
      {#if $twitterUsername}
        <div class="flex flex-col w-full gap-2">
          <div class="rounded-full f-center gap-2 py-2 px-4 bg-neutral">
            <div class="h-8 text-center f-center body-bold">Wallet Connected:</div>
            {#if $account?.address}
              <div class="body-regular rounded-full">{shortenAddress($account?.address, 5, 3)}</div>
            {/if}
          </div>

          <div class="relative flex bg-neutral rounded-full gap-2 py-2 px-4 items-center justify-center w-full">
            <div class="body-bold">Twitter Connected:</div>
            <div class="body-regular flex rounded-full gap-2 bg-primary-background">
              <img class="size-8 avatar rounded-xl" src={TwitterLogo} alt="twitter-logo" />
              <div class="flex items-center">{$twitterUsername}</div>
            </div>
            <button class="btn absolute right-0 bg-transparent rounded-full body-bold" on:click={handleSupabaseLogout}
              >Logout
            </button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 flex-col lg:flex-row">
          <div class="flex w-full lg:w-32">
            <!-- Logout button -->
          </div>
        </div>
        <Search on:search={handle} />
        {#if searching}
          <div class="loading loading-spinner" />
        {/if}

        {#if token}
          <div class="flex flex-col gap-2 lg:w-[530px]">
            <!-- Token Details -->
            <div class="flex body-bold items-center justify-start gap-4">
              <div>Token:</div>
              <div class="avatar">
                <div class="size-4 rounded-full">
                  <img src={token.logoURI} alt="logo" />
                </div>
              </div>
              <div>{token.name}</div>
              <div>{token.address}</div>
            </div>
            <!-- Balance -->
            <div class="flex body-bold items-center justify-start gap-4">
              <div>Balance:</div>
              <div>{assetBalance}</div>
            </div>

            <!-- Holder Status -->
            {#if holderStatus === 'whale'}
              <div class="flex display-xl-medium items-center justify-start gap-4 self-center text-nowrap">
                <div>YOU ARE A WHALE 🐋</div>
              </div>
            {/if}
            {#if holderStatus === 'shark'}
              <div class="flex display-small-medium items-center justify-start gap-4 self-center">
                <div>You are a shark 🦈</div>
              </div>
            {/if}
            {#if holderStatus === 'dolphin'}
              <div class="flex display-small-medium items-center justify-start gap-4 self-center">
                <div>You are a dolphin 🦗</div>
              </div>
            {/if}
            {#if holderStatus === 'shrimp'}
              <div class="flex display-large-medium items-center justify-start gap-4 self-center">
                <div>You are a shrimp! 🦐</div>
              </div>
            {/if}
            {#if holderStatus === 'ghost'}
              <div class="flex body-regular items-center justify-start gap-4 self-center">
                <div>u r a ghost 👻</div>
              </div>
            {/if}
          </div>
        {/if}
        {#if token && !searching}
          <button on:click={fetchData} class="btn">Generate Proof</button>
        {/if}
      {:else}
        <div>
          <SupabaseLogin />
        </div>
      {/if}
    {:else}
      <div class="flex gap-2 justify-center items-center">
        <div class="text-[40px]">👉</div>
        <ConnectWalletButton />
        <div class="text-[40px]">👈</div>
      </div>
    {/if}
  </div>
</Page>
