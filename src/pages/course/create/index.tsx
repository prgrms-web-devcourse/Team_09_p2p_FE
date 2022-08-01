import type { NextPage } from 'next';
import PlaceMap from '~/components/domain/Map/PlaceMap';
import CourseMap from '~/components/domain/Map/CourseMap';
import Head from 'next/head';
import React from 'react';
import { PageContainer } from '~/components/atom';

const CourseCreate: NextPage = () => {
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

      <PageContainer>
        <main>CourseCreate</main>
        {/* <PlaceMap
          placeId={22318989}
          placeName="맥도날드 강남2호점"
          placeType="FD6"
          center={{ lat: 37.49868217455176, lng: 127.0287412218641 }}
        /> */}
        <CourseMap course={course} />
      </PageContainer>
    </React.Fragment>
  );
};

export default CourseCreate;
