import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, PlaceList, SelectRegion, SortFilter } from '~/components/common';
import { useUser } from '~/hooks/useUser';
import { PlaceApi } from '~/service';
import { RegionAndAll } from '~/types';
import { sortOrder, SortType } from '~/types/course';

const Place: NextPage = () => {
  const [placeList, setPlaceList] = useState([]);
  const { currentUser } = useUser();

  const getPlaceList = async (sort?: SortType) => {
    const result = await PlaceApi.getPlaces({ size: 10 }); // api문제로 잠시 대기
    setPlaceList(result.content);
  };

  useEffect(() => {
    getPlaceList(sortOrder.DESC);
  }, [currentUser.accessToken]);

  const handleSelectRegion = async (region: RegionAndAll) => {
    console.log(region);
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
          <PlaceList places={placeList} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Place;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
