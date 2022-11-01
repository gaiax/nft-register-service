

export interface NFT {
  id: string
  imageURL: string
  message: string
  name: string
  owner: string
  price: string 
  seller: string
}

export interface ServerResponse {
  data: ServerData
}