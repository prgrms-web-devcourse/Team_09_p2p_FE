import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '~/components/atom';
import {
  CategoryTitle,
  CourseList,
  SelectRegion,
  SelectTags,
  SortFilter
} from '~/components/common';

import { RegionAndAll, SearchTagsValues } from '~/types';
import { CourseApi } from '~/service';
import { useRouter } from 'next/router';
import { CourseFilter } from '~/types/course';

const Course: NextPage = () => {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(0);
  const [lastTarget, setLastTarget] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const SIZE = 15;

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading && !isLast) {
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
      const result = await CourseApi.getCourses({ ...filter, size: SIZE });
      console.log(router, 'router');
      console.log(result, 'result');
      if (result.last) {
        setIsLast(true);
      }

      setCourseList(courseList.concat(result.content));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(lastTarget, '★★★★★ref');
    getCourseList({ page });
  }, [page]);

  useEffect(() => {
    console.log(lastTarget);
    let observer: IntersectionObserver;
    if (lastTarget) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(lastTarget);
    }
    return () => observer && observer.disconnect();
  }, [lastTarget]);

  const handleSelectRegion = async (region: RegionAndAll) => {
    console.log('코스페이지', region);
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    console.log('코스페이지', data);
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
          <CategoryTitle name="여행코스" />
          <FilterList>
            <SelectRegion onSelect={handleSelectRegion} />
            <SelectTags style={{ marginTop: '24px' }} onSelect={handleSelectTags} />
          </FilterList>
          <SortFilter onSort={getCourseList} />
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
