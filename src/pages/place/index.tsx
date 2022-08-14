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
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);
  const [lastTarget, setLastTarget] = useState(null);

  const SIZE = 16;

  const [queries, setQueries] = useState<QueryState>({
    period: (query.period && correctedPeriod(query.period)) || null,
    region: (query.region && correctedRegion(query.region)) || '전체보기',
    page: 0,
    size: SIZE,
    sorting: '인기순'
  });

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading && !isLast) {
        console.log('관찰');
        setPage((prev) => prev + 1);

        observer.unobserve(entry.target);
      }
      if (isLast) {
        observer.disconnect();
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastTarget) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(lastTarget);
    }
    return () => observer && observer.disconnect();
  }, [lastTarget]);

  const getPlaceList = async () => {
    setIsLoading(true);
    if (router.query.index) {
      // 뒤로가기 시 index 코드
    } else {
      const result = await PlaceApi.search({
        ...queries,
        region: queries.region === '전체보기' ? undefined : queries.region,
        page,
        size: SIZE
      });
      console.log('요청', { ...queries, page, size: SIZE });
      if (result.last) {
        console.log('마지막 페이지 입니다.');
        setIsLast(true);
      }
      setPlaceList(placeList.concat(result.content));
    }
    setIsLoading(false);
  };

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
    setIsLast(false);
    setPage(0);
  }, [queries, currentUser.accessToken]);

  useEffect(() => {
    console.log(page, 'page!');
    if (page !== 0) {
      getPlaceList();
    }
  }, [page]);

  return (
    <React.Fragment>
      <main>
        <PageContainer>
          <CategoryTitle name="추천장소" />
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} defaultValues={queries.region} />
          </FilterList>
          <SortFilter onSort={handleSort} initialValue={queries.sorting} />
          <PlaceList places={placeList} ref={setLastTarget} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Place;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
