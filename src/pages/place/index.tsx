import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, PlaceList, SelectRegion, SortFilter } from '~/components/common';
import { useUser } from '~/hooks/useUser';
import { PlaceApi } from '~/service';
import { Period, Region, RegionAndAll } from '~/types';
import { sortOrder, SortType } from '~/types/course';
import { correctedPeriod, correctedRegion, makeQueryString } from '~/utils/converter';

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return {
    props: { query }
  };
};

type QueryState = {
  period: Period | null;
  region: RegionAndAll;
  page: number;
  size: number;
  sorting: SortType;
};

const Place = ({ query }: { query: Record<string, string> }) => {
  const router = useRouter();
  const [placeList, setPlaceList] = useState([]);
  const { currentUser } = useUser();
  const [queries, setQueries] = useState<QueryState>({
    period: (query.period && correctedPeriod(query.period)) || null,
    region: (query.region && correctedRegion(query.region)) || '전체보기',
    page: 0,
    size: 16,
    sorting: '인기순'
  });

  const replaceRoute = () => {
    router.replace(
      {
        pathname: '/place',
        query: { ...queries }
      },
      `/place${makeQueryString(queries)}`,
      {
        scroll: false
      }
    );
  };

  const getPlacesByQuery = async () => {
    try {
      const response = await PlaceApi.search({
        ...queries,
        region: queries.region === '전체보기' ? undefined : queries.region
      });
      setPlaceList(response.content);
    } catch (e) {
      console.error('장소페이지에서 장소목록을 불러오는데 실패했어요.', e);
      setPlaceList([]);
    }
  };

  const handleSelectRegion = (region: RegionAndAll) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      region
    }));
  };

  const handleSort = (sorting: SortType) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      sorting
    }));
  };

  useEffect(() => {
    replaceRoute();
    getPlacesByQuery();
  }, [queries, currentUser.accessToken]);

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
            <SelectRegion onSelect={handleSelectRegion} defaultValues={queries.region} />
          </FilterList>
          <SortFilter onSort={handleSort} initialValue={queries.sorting} />
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
