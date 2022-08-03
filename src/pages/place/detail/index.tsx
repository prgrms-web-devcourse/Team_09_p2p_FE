import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';

const PlaceDetail: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="place detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer type="detail">여기는 장소 detail 페이지의 홈</PageContainer>
      </main>
    </React.Fragment>
  );
};

export default PlaceDetail;
