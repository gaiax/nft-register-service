import * as functions from "firebase-functions";
import { ethers } from 'ethers';
import { NftPlatform__factory } from "../../typechain-types/factories/contracts/NftPlatform__factory";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async(request, response) => {
  const rpc = String(process.env.RPC_URL);
  const Nftplatform_ADDRESS = String(process.env.CONTRACT_ADDRESS); 
  const privateKey = String(process.env.PRIVATE_KEY);

  const signer = new ethers.Wallet(privateKey);
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const signerWithProvider = signer.connect(provider);
  const Nftplatform = NftPlatform__factory.connect(
    Nftplatform_ADDRESS,
    signerWithProvider
  );

  const mint = await Nftplatform.safeMint(
    "0xe4832791325a4519E96881e9798DBf1e88Ed6724",
    "name",
    "image",
    "description",
    "1000",
    "0xe4832791325a4519E96881e9798DBf1e88Ed6724"
  );
  await mint.wait();
  
  const bigLastTokenId = await Nftplatform.getLastTokenId();
  const lastTokenId = Number(bigLastTokenId) - 1; // 次にmintされるNFTのIDが返ってくので1マイナスする
  console.log(lastTokenId);

  const tokenURI = await Nftplatform.tokenURI(lastTokenId);

  const b64result = tokenURI.replace("data:application/json;base64,", "");
  const strResult = Buffer.from(b64result, "base64").toString();
  const jsonResult = JSON.parse(strResult);
  console.log(jsonResult);
  
  response.send({"contract":Nftplatform_ADDRESS, "tokenID":lastTokenId, jsonResult});
});
