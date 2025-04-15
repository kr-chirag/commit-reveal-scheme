import { ethers } from "ethers";
import { PRIVATE_KEY1, RPC_INFURA_SEPOLIA } from "./config";
import ABI from "./ABICommitReveal.json";

const contractAdress = "0xb6C565633B5417BC4f5C0434F988B80e1f723E77";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const signer = new ethers.Wallet(PRIVATE_KEY1, provider);
    const commitReveal = new ethers.Contract(contractAdress, ABI, signer);

    const msg = ethers.toUtf8Bytes("My Message");
    const commit = await commitReveal.commit(msg);

    const sign = new ethers.SigningKey(PRIVATE_KEY1).sign(commit);
    const { v, r, s } = ethers.Signature.from(sign);

    const result = await commitReveal.verify(msg, v, r, s);
    console.log(result);

    const result2 = await commitReveal.verify("0x1234", v, r, s);
    console.log(result2);
}

main().catch(console.log);
