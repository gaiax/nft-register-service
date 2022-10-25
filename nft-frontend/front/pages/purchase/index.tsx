import React, { useState } from "react"
import Layout from '../../components/layouts/index'
import { ReactElement } from 'react';

export default function Purchase() {
  return (
    <div>purchase page</div>
  )
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}