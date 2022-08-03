import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Layout from '~/components/common/Layout';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWidthLayout = AppProps & { Component: NextPageWithLayout };

function MyApp({ Component, pageProps }: AppPropsWidthLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
