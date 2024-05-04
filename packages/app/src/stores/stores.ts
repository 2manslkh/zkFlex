import type { GetAccountReturnType } from "@wagmi/core";
import { readable, writable } from "svelte/store";

export const account = writable<GetAccountReturnType>();

import type { ScreenMode, Token } from "$types";

export const screenSize = writable<number>(0);
export const screen = writable<ScreenMode>("desktop");
export const token = writable<Token>();