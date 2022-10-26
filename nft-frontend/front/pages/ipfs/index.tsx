import React, { useState } from "react"
import Layout from '../../components/layouts/index'
import { ReactElement } from 'react';
import { imageToIpfsHash } from '../../components/ipfs'


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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted...');
    setLoad(false);
    const hash = await imageToIpfsHash(buffer);
    setResultHash(hash);
    console.log(hash);
    setEnd(true);
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange}></input>
        <button>Submit</button>
      </form>

      <div>IPFS Hash : https://ipfs.io/ipfs/{resultHash}</div>
        <div>
          IPFS Link is{' '}
          <a
            href={`https://ipfs.io/ipfs/${resultHash}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            here
          </a>
        </div>
    </div>

  )
}

Ipfs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}