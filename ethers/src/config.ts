import dotEnv from "dotenv";
dotEnv.config();

export const RPC_INFURA_SEPOLIA = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;
export const ACCOUNT1 = `${process.env.ACCOUNT1}`;
export const PRIVATE_KEY1 = `${process.env.PRIVATE_KEY1}`;
