import { wagmiConfig } from "$libs/wagmi";
import { account, token } from "$stores/stores";
import { twitterUsername } from "$stores/supabase";
import { signMessage } from "@wagmi/core";
import { get } from "svelte/store";

export async function generateProof(): Promise<any> {
    // Get user signature to prove ownership
    let signature = await signMessage(wagmiConfig, {
        message: 'Proof of ownership',
    });

    try {
        const requestBody = {
            message: 'Proof of ownership',
            twitterName: get(twitterUsername),
            address: get(account).address,
            signature: signature,
            chain: get(account).chainId,
            tokenAddress: get(token).address,
            symbol: get(token).symbol,
        };
        const response = await fetch('https://zkflex.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();

        return data;


    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
    }
}