export function trimHash(hash: string) {
    // check if string starts with 0x, if it doesnt add it
    if (hash.startsWith("0x")) {
        return hash;
    } else {
        return `0x${hash}`;
    }
}