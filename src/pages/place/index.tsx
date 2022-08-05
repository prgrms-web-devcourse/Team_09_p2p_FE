import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, PlaceList, SelectRegion, SortFilter } from '~/components/common';

const Place: NextPage = () => {
  const handleSelectRegion = async (text: string) => {
    console.log(text);
  };

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
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} />
          </FilterList>
          <SortFilter />
          <PlaceList />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Place;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
