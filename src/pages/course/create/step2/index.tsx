import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter } from '~/components/common';
import CourseMap from '~/components/domain/Map/CourseMap';

const Course: NextPage = () => {
  const course = [
    {
      placeId: 1266228191,
      lat: 35.0768018,
      lng: 129.023402,
      placeName: '송도해상케이블카 송도베이스테이션'
    },
    { placeId: 8202423, lat: 35.1538826, lng: 129.118628, placeName: '광안리해수욕장' },
    { placeId: 8111808, lat: 35.0554585, lng: 129.087973, placeName: '태종대유원지' }
  ];
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer>
          <MapWrapper>
            <CourseMap course={course} />
          </MapWrapper>
          <TitleInputWrapper>
            <TitleInput placeholder="코스의 제목을 입력해주세요" />
            <TitleUnderLine />
          </TitleInputWrapper>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

const MapWrapper = styled.div`
  margin: 50px 0 50px 0;
`;

const TitleInputWrapper = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  height: 300px;
  width: 300px;
`;

const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 18px;
  height: 50px;
  padding: 10px 0px;

  width: 200px;

  &:focus {
    outline: none;
    ::-webkit-input-placeholder {
      color: dodgerblue;
    }
    + span {
      transform: scale(1);
    }
  }
  ::-webkit-input-placeholder {
    color: #aaa;
  }
`;

const TitleUnderLine = styled.span`
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  width: 202px;
  transform: scale(0, 1);
  margin-bottom: 20px;
`;

export default Course;
