import React, { useState } from "react"
import Layout from '../../components/layouts/index'
import { ReactElement } from 'react';

// const env = require.main.require('./env');

// //後ほどipfsをインストールする
// const IPFS = require('ipfs-http-client')

//後ほどIDとKEYを設定する
//読み込めていないのでenvファイルの読み込み方を確認する
const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const INFURA_SECRET_KEY = process.env.NEXT_PUBLIC_INFURA_SECRET_KEY;

// const auth =
//   "Basic " + Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: "5001",
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
//   timeout: 100000,
// });


export default function Ipfs() {
  const [buffer, setBuffer] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [resultHash, setResultHash] = useState('');
  const [load, setLoad] = useState<boolean>(true);
  const [end, setEnd] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onloadend = () => {
      const res = reader.result as string;
      setBuffer(Buffer.from(res));
      console.log(reader.result);
    };
    console.log(buffer);
    console.log(INFURA_ID);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('submitted...');
  //   setLoad(false);
  //   const hash = await getImageIpfsHash(buffer);
  //   setResultHash(hash);
  //   console.log(hash);
  //   setEnd(true);
  // }
  // const getImageIpfsHash = async (imageData: any) => {
  //   const base64 = imageData.substring(imageData.indexOf(',') + 1)
  //   const binary_string = window.atob(base64)
  //   const binary_length = binary_string.length
  //   const bytes = new Uint8Array(binary_length)
  //   for (let i = 0; i < binary_length; i++) {
  //     bytes[i] = binary_string.charCodeAt(i)
  //   }
  //   const ipfsHash = await ipfs.add(bytes.buffer)
  //   return ipfsHash.path
  // }

  return (
    <div>
      <form >
        <input type="file" onChange={handleChange}></input>
        <button>Submit</button>
      </form>
    </div>

  )
}

Ipfs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}