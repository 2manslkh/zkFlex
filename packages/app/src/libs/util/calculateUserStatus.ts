import { parseEther } from "viem";
import type { FlexType } from "../../types/types";

export function calculateUserRank(assetBalance: string): FlexType {
    let holderStatus: FlexType;
    if (parseEther(assetBalance) > parseEther('100000')) {
        holderStatus = 'whale';
    } else if (parseEther(assetBalance) > parseEther('1000')) {
        holderStatus = 'shark';
    } else if (parseEther(assetBalance) > parseEther('10')) {
        holderStatus = 'dolphin';
    } else if (parseEther(assetBalance) > parseEther('0')) {
        holderStatus = 'shrimp';
    } else {
        holderStatus = 'ghost';
    }
    return holderStatus;
}

export function rankToEmojiMap(rank: FlexType) {
    rank = rank.toLowerCase() as FlexType;
    switch (rank) {
        case 'shrimp':
            return '🦐';
        case 'dolphin':
            return '🐬';
        case 'shark':
            return '🦈';
        case 'whale':
            return '🐋';
        default:
            return '👻';
    }
}

export function rankToPointsMap(rank: FlexType) {
    rank = rank.toLowerCase() as FlexType;

    switch (rank) {
        case 'shrimp':
            return 1;
        case 'dolphin':
            return 10;
        case 'shark':
            return 1000;
        case 'whale':
            return 100000;
        default:
            return 0;
    }
}