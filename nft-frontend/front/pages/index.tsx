import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';


//後ほどここに現在販売中のリボンを表示するようにする

const Home: NextPage = () => {
 
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/mint');
    }
  });

  return <></>;
}

export default Home
