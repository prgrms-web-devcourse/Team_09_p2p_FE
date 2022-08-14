import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Layout from '~/components/common/Layout';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWidthLayout = AppProps & { Component: NextPageWithLayout };

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppPropsWidthLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="이곳저곳" />
        <meta property="og:site_name" content="이곳저곳" />
        <meta property="og:url" content="https://team-09-p2p-fe.vercel.app/" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta
          property="og:description"
          content="다양한 여행 코스 정보를 확인할 수 있는 이곳저곳!"
        />
      </Head>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </>
  );
}

export default MyApp;
