require('dotenv').config();
import * as functions from "firebase-functions"
import { ethers } from 'ethers'
import { NftPlatform__factory } from "../../typechain-types/factories/contracts/NftPlatform__factory"

const express = require("express");
const cors = require('cors')
const expressApp = express()

// expressApp.use(cors({ origin: process.env.CORS_ORIGIN }))
// expressApp.use(cors)
// expressApp.use(express.json())
expressApp.use(cors({ origin: true }))

//helthCheckをしてAPIが動いているか確かめる
expressApp.get("/helthCheck", express.json(), async (request: any, response: any) => {
  response.set('Access-Control-Allow-Origin', '*');
  // response.sendStatus(201).send('OK');

  response.json({
    answer: "success!"
  });
})


expressApp.post("/mint", express.json(), async (request: any, response: any) => {
  response.set({ 'Access-Control-Allow-Origin': '*' });

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
    signer.address,
    request.body.name, 
    request.body.image, 
    request.body.description,
    request.body.price,
    request.body.seller
  );
  await mint.wait();
  
  const bigLastTokenId = await Nftplatform.getLastTokenId();
  const lastTokenId = Number(bigLastTokenId) - 1; 
  functions.logger.log(lastTokenId);

  const tokenURI = await Nftplatform.tokenURI(lastTokenId);

  const b64result = tokenURI.replace("data:application/json;base64,", "");
  const strResult = Buffer.from(b64result, "base64").toString();
  const jsonResult = JSON.parse(strResult);

  const owner = await Nftplatform.ownerOf(lastTokenId)
  jsonResult.contract = Nftplatform_ADDRESS
  jsonResult.tokenID = lastTokenId
  jsonResult.to = owner
  
  // response.send({"contract":Nftplatform_ADDRESS, "tokenID":lastTokenId, jsonResult});
  response.json(jsonResult);
});

// expressApp.listen(5001, () => console.log('Node server listening on port !'));
exports.api = functions.https.onRequest(expressApp);
