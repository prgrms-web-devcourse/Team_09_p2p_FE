import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { PageContainer, Title } from '~/components/atom';
import { SelectTags, SelectRegion } from '~/components/common';
import { RegionAndAll, SearchTagsValues } from '~/types';

const SearchedKeywordPage: NextPage = () => {
  const {
    query: { keyword }
  } = useRouter();

  const handleSelectRegion = async (region: RegionAndAll) => {
    console.log(region);
  };

  const handleSelectTags = async (data: SearchTagsValues) => {
    console.log(data);
  };

  //TODO
  //로딩 처리, 데이터가 없을 경우 처리를 해야한다.
  if (!keyword) {
    return <p>loading...</p>;
  }

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
            <b>&ldquo;{keyword}&rdquo;</b>로 검색된 결과입니다.
          </Title>
          <SelectRegion onSelect={handleSelectRegion} />
          <SelectTags style={{ marginTop: '20px' }} onSelect={handleSelectTags} />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default SearchedKeywordPage;
