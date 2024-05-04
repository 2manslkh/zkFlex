import type { AuthSession, SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../database.types";
import { writable } from "svelte/store";

export const input = writable<string>("");
export const supabaseClient = writable<SupabaseClient<Database>>();
export const session = writable<AuthSession | null>();
export const twitterUsername = writable<string>("");
export const twitterId = writable<string>("");