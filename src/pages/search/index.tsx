import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { PageContainer, Title } from '~/components/atom';
import { SelectTags, SelectRegion, CourseList, SortFilter } from '~/components/common';
import { CourseApi } from '~/service';
import { RegionAndAll, SearchTagsValues } from '~/types';
import { CourseSearchParams, ICourseItem, SortType } from '~/types/course';
import {
  correctedPeriod,
  correctedRegion,
  correctedSpots,
  correctedThemes
} from '~/utils/converter';

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return {
    props: { query }
  };
};

const SearchPage = ({ query }: { query: Record<string, string> }) => {
  const [queries, setQueries] = useState<CourseSearchParams>({
    keyword: query.keyword || '',
    period: (query.period && correctedPeriod(query.period)) || null,
    region: (query.region && correctedRegion(query.region)) || '전체보기',
    themes: (query.themes && correctedThemes(query.themes)) || [],
    spots: (query.spots && correctedSpots(query.spots)) || [],
    page: 0,
    size: 15,
    sorting: '인기순'
  });
  const [courseList, setCourseList] = useState<ICourseItem[]>([]);

  const handleSelectRegion = async (region: RegionAndAll) => {
    setQueries({
      ...queries,
      region
    });
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

  const getCoursesByQuery = async () => {
    try {
      const response = await CourseApi.search(queries);
      setCourseList(response.content);
    } catch (e) {
      // "부산"을 검색하면 500에러가 나옴..
      console.error('검색 필터링에 실패했어요.', e);
      setCourseList([]);
    }
  };

  useEffect(() => {
    setQueries({
      ...queries,
      keyword: query.keyword || '',
      period: (query.period && correctedPeriod(query.period)) || null,
      region: (query.region && correctedRegion(query.region)) || '전체보기',
      themes: (query.themes && correctedThemes(query.themes)) || [],
      spots: (query.spots && correctedSpots(query.spots)) || []
    });
  }, [query]);

  useEffect(() => {
    getCoursesByQuery();
  }, [queries]);

  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="searched course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <Title level={1} size="sm" style={{ margin: '30px 0' }}>
            {Object.keys(query).length !== 0 && (
              <>
                &ldquo;{query.keyword || (query.themes && `#${query.themes}`)}
                &rdquo; 에 대한 검색 결과입니다.
              </>
            )}
          </Title>
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} toInitializeTrigger={queries.keyword} />
            <SelectTags
              style={{ marginTop: '20px' }}
              onSelect={handleSelectTags}
              toInitializeTrigger={queries.keyword}
            />
          </FilterList>
          {courseList.length === 0 ? (
            <h1>검색 결과가 없습니다.</h1>
          ) : (
            <>
              <SortFilter initialValue={queries.sorting} onSort={handleSort} />
              <CourseList courses={courseList} />
            </>
          )}
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default SearchPage;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
