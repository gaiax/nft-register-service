require('dotenv').config();
import * as functions from "firebase-functions"
import { ethers } from 'ethers'
import { NftPlatform__factory } from "../../typechain-types/factories/contracts/NftPlatform__factory"

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const express = require("express");
const cors = require('cors')
const expressApp = express()
expressApp.use(cors({ origin: true }))

//firestoreの初期化
initializeApp();
const db = getFirestore();

//helthCheckをしてAPIが動いているか確かめる
expressApp.get("/helthCheck", express.json(), async (request: any, response: any) => {
  response.set('Access-Control-Allow-Origin', '*');

  const docRef = db.collection('users').doc('alovelace');

  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });


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
    request.body.to,
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

  response.json(jsonResult);

  const docNft = db.collection('NFTs').doc(String(lastTokenId));
  await docNft.set({
    owner: request.body.to,
    name: request.body.name,
    imageURL: request.body.image,
    message: request.body.description,
    id: String(lastTokenId),
    price: request.body.price,
    seller: request.body.seller
  });
});

exports.api = functions.https.onRequest(expressApp);
