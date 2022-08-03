import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const SearchedKeywordPage: NextPage = () => {
  const {
    query: { keyword }
  } = useRouter();

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
        <h1>검색어 : {keyword} !!!</h1>
        <h2>여기서 검색 리스트를 보여줍니다.</h2>
      </main>
    </React.Fragment>
  );
};

export default SearchedKeywordPage;
