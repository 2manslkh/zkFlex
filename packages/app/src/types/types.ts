export interface Toast {
    id?: number;
    type: 'info' | 'success' | 'error' | 'copy' | 'sad';
    dismissible?: boolean;
    timeout?: number;
    message?: string;
    txnHash?: string;
}

export type ScreenMode = 'desktop' | 'mobile';

export type Token = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
};

export type TokenList = Record<Address, Token>

export type Address = string;

export type TokenBalance = {
    [key: Address]: string;
};

export type FlexType = 'whale' | 'shark' | 'dolphin' | 'shrimp' | 'ghost';