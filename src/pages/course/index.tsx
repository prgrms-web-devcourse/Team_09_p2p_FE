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
import { CourseApi } from '~/service';

const Course: NextPage = () => {
  const [courseList, setCourseList] = useState([]);

  const getCourseList = async () => {
    const result = await CourseApi.getCourses();
    console.log('[Courses] :', result.content);
    setCourseList(result.content);
  };

  useEffect(() => {
    getCourseList();
  }, []);

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
            <SelectRegion />
            <SelectTags style={{ marginTop: '24px' }} />
          </FilterList>
          <SortFilter />
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
