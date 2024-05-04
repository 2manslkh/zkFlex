import pkg from "@nouns/assets"
import { getNounData } from '@nouns/assets';
import { getNounSeedFromBlockHash } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { zeroHash, keccak256, numberToHex } from 'viem';

const { ImageData } = pkg;
const { bgcolors, palette, images } = ImageData;
const { bodies, accessories, heads, glasses } = images;


export function generateNounsSVG(hash: string) {
    const seed = getNounSeedFromBlockHash(0, hash);
    const { parts, background } = getNounData(seed);
    const svgBinary = buildSVG(parts, palette, background);
    return { svg: btoa(svgBinary), background };
}


export function generateNounSVGMock() {
    return generateNounsSVG(keccak256(numberToHex(Math.round(Math.random() * 1000))));
}