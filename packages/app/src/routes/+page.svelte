<script lang="ts">
  import Search from '$components/Input/Search.svelte';
  import { Page } from '$components/Page';
  import { redirect } from '@sveltejs/kit';
  import type { FlexType, Token } from '$types';
  import { parseEther } from 'viem';
  import GithubLogo from '$images/twitter.png';
  import { MOCK_TOKENS, MOCK_BALANCES } from '$mocks';
  import { account } from '$stores/stores';
  import { ConnectWalletButton } from '$components/Button';
  import { MetaTags } from 'svelte-meta-tags';
  import {
	goto
} from '$app/navigation';
  import { SupabaseLogin } from '$components/Supabase';
  import { twitterUsername } from '$stores/supabase';
  import { supabaseClient } from '$libs/supabase';
  let searching = false;
  let assetBalance: string = '0';
  let token: Token;

  let holderStatus: FlexType = 'ghost';

  $: if (parseEther(assetBalance) > parseEther('1000')) {
    holderStatus = 'whale';
  } else if (parseEther(assetBalance) > parseEther('40')) {
    holderStatus = 'shark';
  } else if (parseEther(assetBalance) > parseEther('0')) {
    holderStatus = 'dolphin';
  } else {
    holderStatus = 'ghost';
  }

  function handle(event: any) {
    console.log($account.address);

    searching = true;

    // 5 second callback
    setTimeout(() => {
      console.log('5 seconds later');
      token = MOCK_TOKENS[event.detail.address];
      assetBalance = MOCK_BALANCES[event.detail.address];
      searching = false;
    }, 2000);

    // This function should get the user's asset balance
    // await getAssetBalance();
  }
  async function fetchData() {
    try {
      searching = true;
      const requestBody = {
        message: 'Proof of ownership',
        twitterName: $twitterUsername,
        address: $account.address,
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
      
      goto('/proof/'+data.hash);
      console.log(data)
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
    <div class="f-center flex-col gap-2 pb-20 pt-10">
      <div class="display-large-medium">zkFlex💪💪💰</div>
      <div class="body-bold">Show that your size is size.</div>
    </div>
    {#if $account?.isConnected}
    {#if $twitterUsername}
    <div class="flex bg-neutral rounded-full py-2 pl-6 pr-2 items-center justify-between w-fit gap-4">
      <div class="body-regular">Connected: </div>
      <div class="body-regular flex rounded-full gap-2 bg-primary-background">
        <img class="w-10 h-10" src={GithubLogo} alt="twitter-logo" />
        <div class='flex items-center'>{$twitterUsername}</div>
      </div>
    </div>
    <!-- Buttons -->
    <div class="flex gap-4 flex-col lg:flex-row">
      <div class="flex w-full lg:w-32">
        <!-- Logout button -->
        <button
          class="btn btn-primary btn-block bg-transparent rounded-full body-bold"
          on:click={handleSupabaseLogout}
          >Logout
        </button>
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
          <div>{MOCK_BALANCES[token.address]}</div>
        </div>

        <!-- Holder Status -->
        {#if holderStatus === 'whale'}
          <div class="flex display-xl-medium items-center justify-start gap-4 self-center text-nowrap">
            <div>YOU ARE A WHALE 🐋</div>
          </div>
        {/if}
        {#if holderStatus === 'shrimp'}
          <div class="flex display-large-medium items-center justify-start gap-4 self-center">
            <div>You are a shrimp! 🦐</div>
          </div>
        {/if}
        {#if holderStatus === 'grasshopper'}
          <div class="flex display-small-medium items-center justify-start gap-4 self-center">
            <div>You are a grasshopper 🦗</div>
          </div>
        {/if}
        {#if holderStatus === 'ghost'}
          <div class="flex body-regular items-center justify-start gap-4 self-center">
            <div>u r a ghost 👻</div>
          </div>
        {/if}
      </div>
    {/if}
    <button on:click={fetchData} class="btn">Generate Proof</button>
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
