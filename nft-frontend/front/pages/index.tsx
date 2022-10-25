import { Component, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/layouts/index'


//後ほどここに現在販売中のリボンを表示するようにする

export default function Home() {
 
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/mint');
  //   }
  // });

  return (
    <div>
      リダイレクトします。
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return <Layout>{page}</Layout>;
}

