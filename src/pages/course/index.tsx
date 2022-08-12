import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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
import { SortType } from '~/types/course';
import {
  correctedPeriod,
  correctedRegion,
  correctedSpots,
  correctedThemes,
  makeQueryString
} from '~/utils/converter';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);
  const [queries, setQueries] = useState<QueryState>({
    period: (query.period && correctedPeriod(query.period)) || null,
    region: (query.region && correctedRegion(query.region)) || '전체보기',
    themes: (query.themes && correctedThemes(query.themes)) || [],
    spots: (query.spots && correctedSpots(query.spots)) || [],
    page: 0,
    size: 15,
    sorting: '인기순'
  });

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
      const response = await CourseApi.search(queries);
      setCourseList(response.content);
    } catch (e) {
      console.error('코스페이지에서 코스목록을 불러오는데 실패했어요.', e);
      setCourseList([]);
    }
  };

  const handleSelectRegion = async (region: RegionAndAll) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      region
    }));
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    const { period, themes, spots } = data;
    setQueries({
      ...queries,
      period,
      themes,
      spots
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
  }, [queries]);

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
          <CourseList courses={courseList} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Course;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
