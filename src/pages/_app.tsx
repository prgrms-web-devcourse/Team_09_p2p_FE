import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Layout from '~/components/common/Layout';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import AppHead from '~/components/domain/AppHead';
import Spinner from '~/components/common/Spinner';
import { useRouteChange } from '~/hooks';

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWidthLayout = AppProps & { Component: NextPageWithLayout };

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppPropsWidthLayout) {
  const { loading } = useRouteChange();

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <AppHead />
      <RecoilRoot>{getLayout(loading ? <Spinner /> : <Component {...pageProps} />)}</RecoilRoot>
    </>
  );
}

export default MyApp;
