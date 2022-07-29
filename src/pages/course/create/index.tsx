import type { NextPage } from 'next';
import PlaceMap from '~/components/domain/Map/PlaceMap';
import Head from 'next/head';
import React from 'react';

const CourseCreate: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>CourseCreate</main>
      <PlaceMap
        placeId={22318989}
        placeName="맥도날드 강남2호점"
        placeType="FD6"
        center={{ lat: 37.49868217455176, lng: 127.0287412218641 }}
      />
    </React.Fragment>
  );
};

export default CourseCreate;
