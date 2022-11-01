import { Component, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/layouts/index'
import MediaCard from '../components/card/Card'
import { NFT, ServerResponse } from '../utils/type'
import axios, {AxiosResponse} from "axios"
import Image from 'next/image'
import { Test } from 'mocha';

export interface Props {
  nft: NFT 
}

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([])

  const getNfts =  async () => {
    const nftDocs = await axios.get(process.env.NEXT_PUBLIC_API_BASE + '/getNfts')
    .then((res: ServerResponse) =>res.data);
    return nftDocs;
  }

  const fetchNFTs = useCallback(async () => {
    const newDocs = await getNfts();    
    await setNfts(newDocs.NFTs);
  }, [])

  useEffect(() => {
    fetchNFTs()
  }, []);

  const TestSample = () => {
    const TopNFT = nfts[0];
    console.log("text",TopNFT);

    if(TopNFT) {
      // return <SpecialNFT nft={TopNFT} />
      return <MediaCard nft={TopNFT} />
    }
    return null;
  }

  // const SpecialNFT = ({nft} :Props) => (
  //   <div>
  //     <a className="flex flex-col items-center p-3 bg-white rounded-xl border-2 border-gray-200">
  //       <img className="mt-4 w-48" src={nft.imageURL} alt="topNFT" />
  //       <p>{nft.name}</p>
  //     </a>
  //   </div>
  // )

  

  return (
    <div>
      <h1>NFT一覧</h1>

      <TestSample />     
     
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return <Layout>{page}</Layout>;
}

