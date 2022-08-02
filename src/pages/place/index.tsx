import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, PlaceList, SortFilter } from '~/components/common';

const Place: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <CategoryTitle name="추천장소" />
          <SortFilter />
          <PlaceList />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Place;
