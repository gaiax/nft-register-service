import { create } from 'ipfs-http-client'

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const INFURA_SECRET_KEY = process.env.NEXT_PUBLIC_INFURA_SECRET_KEY;

const auth =
  "Basic " + Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
  timeout: 100000,
});

export const imageToIpfsHash = async (filePath: ArrayBuffer) => {
  console.log('Uploading image to ipfs')
  console.log(INFURA_ID);
  console.log(INFURA_SECRET_KEY)
  const ipfsHash = await ipfs.add(filePath)
  return ipfsHash.path
  
}
