import { Component, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/layouts/index'
import MediaCard from '../components/card/Card'
import { NFT, ServerResponse } from '../utils/type'
import axios, {AxiosResponse} from "axios"
import Image from 'next/image'

//後ほどここに現在販売中のリボンを表示するようにする

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([])

  const getNfts =  async () => {
    const nftDocs = await axios.get(process.env.NEXT_PUBLIC_API_BASE + '/getNfts')
    .then((res: ServerResponse) =>res.data);
    console.log(nftDocs);
    return nftDocs;
  }

  const fetchNFTs = useCallback(async () => {
    const newDocs = await getNfts();
       
    await setNfts(newDocs.NFTs);
    console.log(newDocs.NFTs)
  }, [])

  useEffect(() => {
    fetchNFTs()
  }, []);

  const TestSample = () => {
    const TopNFT = nfts[0];
    console.log(nfts[0].imageURL);
  }

  return (
    <div>
      リダイレクトします。

      <button onClick={TestSample} />
      {/* <MediaCard img="https://i.imgur.com/AD3MbBi.jpeg"/> */}
      {/* <img src="https://ipfs.io/ipfs/QmSc6JkFPzkE4XioSLpKaC32Sp1zYZfpQMXkeiuQ6fJMCB"></img> */}
      {/* <img src="https://i.imgur.com/AD3MbBi.jpeg"></img> */}
      {/* <Image src={nfts[0].imageURL}></Image> */}
     
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return <Layout>{page}</Layout>;
}

