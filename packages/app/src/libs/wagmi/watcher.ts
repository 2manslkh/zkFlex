import { watchAccount } from '@wagmi/core';

import { wagmiConfig } from './client';


let isWatching = false;
let unWatchAccount: () => void;

export async function startWatching() {

  if (!isWatching) {
    unWatchAccount = watchAccount(wagmiConfig, {
      onChange(data) {
        console.log("Account Changed", data);
      },
    });

    isWatching = true;
  }
}

export function stopWatching() {
  unWatchAccount();
  isWatching = false;
}
