import * as React from 'react';
import { NFT, ServerResponse } from '../../utils/type'
import MediaCard from './Card';

export interface Props {
  nfts: NFT[]
}

export default function NftList({nfts}: Props) {
  return (
    <div>
      {nfts.map((nft ,index) => (
        <MediaCard key={index} nft={nft} />
      ))}
    </div>
  )

}