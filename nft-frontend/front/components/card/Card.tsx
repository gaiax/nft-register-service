import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NFT, ServerResponse } from '../../utils/type'

export interface Props {
  nft: NFT 
}

export default function MediaCard({nft}: Props) {
  return (
    
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={nft.imageURL}
        alt="NFT"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          NFT
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ここにNFTの説明が表示されます
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
