import { ReactNode } from 'react';
import Head from 'next/head';
import { ReactElement } from 'react';

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
      <main>
        {children}
      </main>
      <footer>
      </footer>
    </>
  );
};