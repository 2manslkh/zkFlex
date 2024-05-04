import mongoose from "mongoose";

const Proof = new mongoose.Schema({
    rank: String,
    twitter: String,
    tokenAddress: String,
    hash: String,
    proof: String,
});

export default mongoose.model("proof", Proof);