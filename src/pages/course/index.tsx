import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter } from '~/components/common';

const Course: NextPage = () => {
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
          <SortFilter />
          <CourseList />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Course;
