import { ReactNode } from 'react';
import { ReactElement } from 'react';
import Head from 'next/head';
import MenuBar from './header/MenuBar';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout ({ children, title = '' }: Props) {

  return (
    <>
      <Head>
        <title>NFT Platform</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuBar/>
      <main>
        {children}
      </main>
      <footer>
      </footer>
    </>
  );
};