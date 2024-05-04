import { parseEther } from "viem";
import type { FlexType } from "../../types/types";

export function calculateUserRank(assetBalance: string): FlexType {
    let holderStatus: FlexType;
    if (parseEther(assetBalance) > parseEther('1000')) {
        holderStatus = 'whale';
    } else if (parseEther(assetBalance) > parseEther('40')) {
        holderStatus = 'shark';
    } else if (parseEther(assetBalance) > parseEther('0')) {
        holderStatus = 'dolphin';
    } else if (parseEther(assetBalance) > parseEther('0')) {
        holderStatus = 'dolphin';
    } else {
        holderStatus = 'ghost';
    }
    return holderStatus;
}