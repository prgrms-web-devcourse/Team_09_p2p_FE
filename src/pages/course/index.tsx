import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PageContainer } from '~/components/atom';
import {
  CategoryTitle,
  CourseList,
  SelectRegion,
  SelectTags,
  SortFilter
} from '~/components/common';

import { Period, RegionAndAll, SearchTagsValues, Spot, Theme } from '~/types';
import { CourseApi } from '~/service';
import { CourseFilter, SortType } from '~/types/course';
import {
  correctedPeriod,
  correctedRegion,
  correctedSpots,
  correctedThemes,
  makeQueryString
} from '~/utils/converter';

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return {
    props: { query }
  };
};

type QueryState = {
  period: Period | null;
  region: RegionAndAll;
  themes: Theme[];
  spots: Spot[];
  page: number;
  size: number;
  sorting: SortType;
};

const Course = ({ query }: { query: Record<string, string> }) => {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(0);
  const [lastTarget, setLastTarget] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const SIZE = 15;

  const [queries, setQueries] = useState<QueryState>({
    period: (query.period && correctedPeriod(query.period)) || null,
    region: (query.region && correctedRegion(query.region)) || '전체보기',
    themes: (query.themes && correctedThemes(query.themes)) || [],
    spots: (query.spots && correctedSpots(query.spots)) || [],
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

  const getCourseList = async (filter: CourseFilter) => {
    setIsLoading(true);
    if (router.query.index) {
      // 뒤로가기 시 index 코드
    } else {
      const result = await CourseApi.search({ ...queries, page, size: SIZE });
      console.log('요청', { ...queries, ...filter, size: SIZE });
      if (result.last) {
        console.log('마지막 페이지 입니다.');
        setIsLast(true);
      }
      setCourseList(courseList.concat(result.content));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastTarget) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(lastTarget);
    }
    return () => observer && observer.disconnect();
  }, [lastTarget]);

  const replaceRoute = () => {
    router.replace(
      {
        pathname: '/course',
        query: { ...queries, themes: queries.themes.join(','), spots: queries.spots.join(',') }
      },
      `/course${makeQueryString(queries)}`,
      {
        scroll: false
      }
    );
  };

  const getCoursesByQuery = async () => {
    try {
      const response = await CourseApi.search({ ...queries, size: SIZE });
      setCourseList(response.content);
      console.log('요청', { ...queries, size: SIZE });
    } catch (e) {
      console.error('코스페이지에서 코스목록을 불러오는데 실패했어요.', e);
      setCourseList([]);
    }
  };

  const handleSelectRegion = async (region: RegionAndAll) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      region,
      page: 0
    }));
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    console.log('d');
    const { period, themes, spots } = data;
    setQueries({
      ...queries,
      period,
      themes,
      spots,
      page: 0
    });
  };

  const handleSort = async (sorting: SortType) => {
    setQueries({
      ...queries,
      sorting
    });
  };

  useEffect(() => {
    replaceRoute();
    getCoursesByQuery();
    setIsLast(false);
    setPage(0);
  }, [queries]);

  useEffect(() => {
    console.log(page, 'page!');
    if (page !== 0) {
      getCourseList({ page });
    }
  }, [page]);

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="content" style={{ position: 'relative' }}>
        <PageContainer>
          <CategoryTitle name="여행코스" />
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} defaultValues={queries.region} />
            <SelectTags
              style={{ marginTop: '24px' }}
              onSelect={handleSelectTags}
              defaultValues={{
                period: queries.period,
                themes: queries.themes,
                spots: queries.spots
              }}
            />
          </FilterList>

          <SortFilter initialValue={queries.sorting} onSort={handleSort} />
          <CourseList courses={courseList} ref={setLastTarget} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Course;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
