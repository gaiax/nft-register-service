import React, { useState } from "react"
import Layout from '../../components/layouts/index'
import { ReactElement } from 'react';

export default function Ipfs() {
  return (
    <div>aaa</div>
  )
}

Ipfs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}