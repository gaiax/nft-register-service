import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useState } from "react"
import { Button, Container, Stack, TextField } from '@mui/material'
import axios from "axios"
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../components/layouts/index'
import { ReactElement } from 'react';

interface NftForm {
  to: string
  name: string
  image: string
  description: string
  price: string
  seller: string
}

export default function Mint() {
  const { register, handleSubmit } = useForm<NftForm>()

  const submit: SubmitHandler<NftForm> = (data) => {
    
    axios.post(
      process.env.NEXT_PUBLIC_API_BASE + "/mint",
      data
    )
    .then(res => {
      console.log(res);
      console.log(data);
    })
  }

  return (
    <div>
      <h1>MINT YOUR NFT!</h1>
        <Container maxWidth="sm" sx={{ pt: 5 }}>
          <Stack spacing={3}>
            <TextField
              required
              label="アドレス"
              {...register('to')}
            />
            <TextField
              required
              label="作品名"
              {...register('name')}
            />
            <TextField
              required
              label="画像URL(ipfs)"
              {...register('image')}
            />
            <TextField
              required
              label="作品概要"
              {...register('description')}
            />
            <TextField
              required
              label="値段"
              {...register('price')}
            />
            <TextField
              required
              label="販売者アドレス"
              {...register('seller')}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(submit)}
            >
              NFTを作成する
            </Button>
          </Stack>
        </Container>
    </div>
  )
}

Mint.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}


