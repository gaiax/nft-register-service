import * as functions from "firebase-functions";
import { ethers } from 'ethers';
import { NftPlatform__factory } from "../../typechain-types/factories/contracts/NftPlatform__factory";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const mint = functions.https.onRequest(async(request, response) => {
  response.set('Access-Control-Allow-Origin', '*')

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
    request.body.to, 
    request.body.name, 
    request.body.image, 
    request.body.description,
    request.body.price,
    request.body.seller
  );
  await mint.wait();
  
  const bigLastTokenId = await Nftplatform.getLastTokenId();
  const lastTokenId = Number(bigLastTokenId) - 1; // 次にmintされるNFTのIDが返ってくので1マイナスする
  functions.logger.log(lastTokenId);

  const tokenURI = await Nftplatform.tokenURI(lastTokenId);

  const b64result = tokenURI.replace("data:application/json;base64,", "");
  const strResult = Buffer.from(b64result, "base64").toString();
  const jsonResult = JSON.parse(strResult);
  console.log(jsonResult);
  
  response.send({"contract":Nftplatform_ADDRESS, "tokenID":lastTokenId, jsonResult});
});
