import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Button, PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter } from '~/components/common';
import CourseMap from '~/components/domain/Map/CourseMap';
import theme from '~/styles/theme';
import numbering from '~/../public/assets/numbering.png';
import PlaceInformation from '~/components/domain/CourseCreate/PlaceInformation';
import { SelectTags } from '~/components/common';
import { SearchTagsValues } from '~/types';

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
  const courseCreatehandler = () => {
    console.log('추후 생성 구현');
  };

  const handleSelectTags = (data: SearchTagsValues) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer type="detail">
          <MapWrapper>
            <CourseMap course={course} />
          </MapWrapper>
          <TitleInputWrapper>
            <TitleInput placeholder="코스의 제목을 입력해주세요" />
            <TitleUnderLine />
            <SelectTags style={{ marginTop: '10px' }} onSelect={handleSelectTags} />
          </TitleInputWrapper>
          <PlacesWrapper>
            <PlaceInformation isLastPlace={false}>1</PlaceInformation>
            <PlaceInformation isLastPlace={false}>2</PlaceInformation>
            <PlaceInformation isLastPlace={true}>3</PlaceInformation>
          </PlacesWrapper>
          <SubmitWrapper>
            <Button buttonType="darkGray" width={184} height={75} onClick={courseCreatehandler}>
              코스 수정{/* 요건 아마 취소버튼으로 변경될거같네요 */}
            </Button>
            <Button buttonType="primary" width={184} height={75} onClick={courseCreatehandler}>
              코스 등록
            </Button>
          </SubmitWrapper>
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
  height: 350px;
  width: 100%;
  text-align: center;
`;

const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${theme.color.fontGray};
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 32px;
  height: 50px;
  padding: 10px 0px;

  width: 100%;

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
    color: ${theme.color.fontGray};
  }
`;

const TitleUnderLine = styled.span`
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  width: 100%;
  transform: scale(0, 1);
  margin-bottom: 20px;
`;

const PlacesWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const SubmitWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 70px 0 151px 0;
  gap: 20px;
`;

export default Course;
