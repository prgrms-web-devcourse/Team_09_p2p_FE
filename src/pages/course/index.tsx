import styled from '@emotion/styled';
import type { NextPage } from 'next';
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

import { RegionAndAll, SearchTagsValues } from '~/types';
import { CourseApi } from '~/service';
import { sortOrder, SortType } from '~/types/course';

const Course: NextPage = () => {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(0);
  const [lastTarget, setLastTarget] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading && !isLast) {
        setIsLoading(true);

        await getCourseList();
        observer.unobserve(entry.target);
        console.log('관찰');
        setIsLoading(false);
      }
    });
  };

  const getCourseList = async (sort?: SortType) => {
    const result = await CourseApi.getCourses({ page, size: 15 });
    console.log(result, 'result');
    if (result.last) {
      setIsLast(true);
    }

    setCourseList(courseList.concat(result.content));
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    getCourseList(sortOrder.DESC);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    console.log(lastTarget, 'ref');
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
