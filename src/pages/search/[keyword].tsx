import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer, Title } from '~/components/atom';
import { SelectTags, SelectRegion, CourseList, SortFilter } from '~/components/common';
import { CourseApi } from '~/service';
import { Period, RegionAndAll, SearchTagsValues, Spot, Theme } from '~/types';
import { CourseSearchParams, ICourseItem, SortType } from '~/types/course';

const SearchedKeywordPage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState<ICourseItem[]>([]);
  const [region, setRegion] = useState<RegionAndAll | null>(null);
  const [period, setPeriod] = useState<Period | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [sorting, setSorting] = useState<SortType>('인기순');
  const isSearched = courseList.length !== 0;
  const {
    query: { keyword }
  } = useRouter();

  const handleSelectRegion = async (region: RegionAndAll) => {
    setRegion(region);
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    const { period, theme, spot } = data;
    setPeriod(period);
    setThemes([...theme]);
    setSpots([...spot]);
  };

  const handleSort = async (sortType: SortType) => {
    setSorting(sortType);
  };

  const searchCourse = async (params: CourseSearchParams) => {
    try {
      const response = await CourseApi.search(params);
      setCourseList(response.content);
    } catch (e) {
      console.error('검색 필터링에 실패했어요.');
    }
  };

  useEffect(() => {
    setLoading(true);
    searchCourse({
      keyword: keyword as string,
      region,
      period,
      theme: [...themes],
      spot: [...spots],
      sorting
    });
    setLoading(false);
  }, [keyword, region, period, themes, spots, sorting]);

  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="searched course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          {loading ? (
            <p>로딩 중..</p>
          ) : (
            <>
              <Title level={1} size="sm" style={{ margin: '30px 0' }}>
                <b>&ldquo;{keyword}&rdquo;</b>에 대한 검색 결과입니다.
              </Title>
              <FilterList>
                <SelectRegion
                  onSelect={handleSelectRegion}
                  toInitializeTrigger={keyword as string}
                />
                <SelectTags
                  style={{ marginTop: '20px' }}
                  onSelect={handleSelectTags}
                  toInitializeTrigger={keyword as string}
                />
              </FilterList>
              {isSearched ? (
                <>
                  <SortFilter initialValue={sorting} onSort={handleSort} />
                  <CourseList courses={courseList} />
                </>
              ) : (
                <h1>
                  <b>검색 결과가 없습니다.</b>
                </h1>
              )}
            </>
          )}
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default SearchedKeywordPage;

const FilterList = styled.div`
  margin-bottom: 30px;
`;
