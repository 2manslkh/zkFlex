import { wagmiConfig } from "$libs/wagmi";
import { account, token } from "$stores/stores";
import { twitterUsername } from "$stores/supabase";
import { signMessage } from "@wagmi/core";
import { get } from "svelte/store";

export async function verifyProof(proof: any): Promise<any> {

    //TODO: @bennettyong
    // 1. Deploy Verifyer contract
    // 2. Call verifyProof function with proof, with necessary encoding
    // 3. Return result

    return false

}