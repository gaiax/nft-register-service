import { Component, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/layouts/index'
import MediaCard from '../components/card/Card'
import NftList from '../components/card/NftList'
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
      return <MediaCard nft={TopNFT} />
    }
    return null;
  }  

  return (
    <div>
      <h1>NFT一覧</h1>

      {/* <TestSample /> */}
     
      <div>
        <NftList nfts={nfts}/>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return <Layout>{page}</Layout>;
}

