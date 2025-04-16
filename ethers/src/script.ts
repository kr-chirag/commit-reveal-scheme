import { ethers } from "ethers";
import { PRIVATE_KEY1, RPC_INFURA_SEPOLIA } from "./config";
import ABI from "./ABICommitReveal.json";

const contractAdress = "0x5Bc5338F4f0f529F238d9cdb429bfF4eC095467d";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const signer = new ethers.Wallet(PRIVATE_KEY1, provider);
    const commitReveal = new ethers.Contract(contractAdress, ABI, signer);

    const msg = ethers.toUtf8Bytes("My Message");

    const sign = await signer.signMessage(msg);
    const { v, r, s } = ethers.Signature.from(sign);
    // console.log(r + s.slice(2) + v.toString(16));

    const result = await commitReveal.verify(msg, v, r, s);
    console.log(result);

    // this will revert
    // const result2 = await commitReveal.verify("0x1234", v, r, s);
    // console.log(result2);
}

main().catch(console.log);
