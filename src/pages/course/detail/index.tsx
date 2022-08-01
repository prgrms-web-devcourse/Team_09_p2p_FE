import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import Comment from '~/components/common/Comment';

const CourseDetail: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer type="detail">
          <Comment />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default CourseDetail;
