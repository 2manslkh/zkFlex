<script lang="ts">
  import { account } from '$stores';
  import { page } from '$app/stores';

  import { shortenAddress } from '$libs/util/shortenAddress';
  import { web3Modal } from '$libs/wagmi';

  function handleConnectWallet() {
    // Do not open if connection is active
    web3Modal.open({ view: 'Connect' });
  }

  function handleConfigureWallet() {
    // Do not open if connection is active
    web3Modal.open({ view: 'Account' });
  }
</script>

{#if !$account?.isConnected}
  <!-- Show Connect Wallet -->
  <button class="btn leading-[18px]" on:click={handleConnectWallet}>Connect Wallet</button>
{:else}
  <!-- Show user address -->
  <button class="btn shadow-md leading-[18px]" on:click={handleConfigureWallet}>
    {shortenAddress($account.address ?? 'undefined', 4, 4)}
  </button>
{/if}
