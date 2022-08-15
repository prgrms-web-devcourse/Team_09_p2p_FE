import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { PageContainer, Title } from '~/components/atom';
import { SelectTags, SelectRegion, CourseList, SortFilter } from '~/components/common';
import { CourseApi } from '~/service';
import { Period, RegionAndAll, SearchTagsValues, Spot, Theme } from '~/types';
import { ICourseItem, SortType } from '~/types/course';
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

type QueryState = {
  keyword: string;
  period: Period | null;
  region: RegionAndAll;
  themes: Theme[];
  spots: Spot[];
  page: number;
  size: number;
  sorting: SortType;
};

const SearchPage = ({ query }: { query: Record<string, string> }) => {
  const [queries, setQueries] = useState<QueryState>({
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

  const getCoursesByQuery = async () => {
    try {
      const response = await CourseApi.search(queries);
      setCourseList(response.content);
    } catch (e) {
      console.error('검색 필터링에 실패했어요.', e);
      setCourseList([]);
    }
  };

  const handleSelectRegion = async (region: RegionAndAll) => {
    setQueries({
      ...queries,
      region
    });
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    const { period, themes, spots } = data;
    const nextThemes = new Set([
      ...(themes || []),
      ...((query.themes && query.themes.split(',')) || [])
    ]);
    const nextSpots = new Set([
      ...(spots || []),
      ...((query.spots && query.spots.split(',')) || [])
    ]);
    setQueries({
      ...queries,
      period,
      themes: [...nextThemes] as Theme[],
      spots: [...nextSpots] as Spot[]
    });
  };

  const handleSort = async (sorting: SortType) => {
    setQueries({
      ...queries,
      sorting
    });
  };

  useEffect(() => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      keyword: query.keyword || '',
      period: (query.period && correctedPeriod(query.period)) || null,
      region: (query.region && correctedRegion(query.region)) || '전체보기',
      themes: (query.themes && correctedThemes(query.themes)) || [],
      spots: (query.spots && correctedSpots(query.spots)) || []
    }));
  }, [query]);

  useEffect(() => {
    getCoursesByQuery();
  }, [queries]);

  return (
    <React.Fragment>
      <main>
        <PageContainer>
          <Title level={1} size="sm" style={{ margin: '30px 0' }}>
            {Object.keys(query).length !== 0 && (
              <>
                &ldquo;{query.keyword || (query.themes && `#${query.themes.split(',').join('#')}`)}
                &rdquo; 에 대한 검색 결과입니다.
              </>
            )}
          </Title>
          <FilterList>
            <SelectRegion
              onSelect={handleSelectRegion}
              defaultValues={queries.region}
              initializeTrigger={queries.keyword}
            />
            <SelectTags
              style={{ marginTop: '20px' }}
              onSelect={handleSelectTags}
              defaultValues={{
                period: queries.period,
                themes: queries.themes,
                spots: queries.spots
              }}
              initializeTrigger={queries.keyword}
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
