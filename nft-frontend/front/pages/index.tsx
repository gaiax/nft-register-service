import { Component, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/layouts/index'
import { NFT } from '../utils/type'
import axios, {AxiosResponse} from "axios"

//後ほどここに現在販売中のリボンを表示するようにする

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([])

  const fetchNFTs = useCallback(async () => {
    const nftDocs = await axios.get(process.env.NEXT_PUBLIC_API_BASE + '/getNfts')
      .then((res) => {
        console.log(res);
        console.log(res.data.NFTs);
        setNfts(res.data.NFTs);
    });
  }, [])

  useEffect(() => {
    fetchNFTs()
  }, []);

  return (
    <div>
      リダイレクトします。
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return <Layout>{page}</Layout>;
}

