import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Icon, Image, PageContainer, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Comment from '~/components/common/Comment';
import CourseDetailList from '~/components/domain/CourseDetail/CourseDetailList';
import CourseOverview from '~/components/domain/CourseDetail/CourseOverview';
import theme from '~/styles/theme';

interface ICourseData {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  themes: string[];
  spots: string[];
  places: IPlace[];
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  nickname: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlace {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  category: string;
  phone: string;
  recommended: false;
}

const courseData: ICourseData = {
  id: 12,
  title: '[1박 2일] 제주도 여행 추천!!!',
  thumbnail: '',
  region: '제주',
  period: '당일',
  themes: ['혼자여행', '데이트코스'],
  spots: ['카페', '음식점'],
  places: [
    {
      id: 1,
      name: '인천공항',
      description: '인천공항에 다녀왔어요',
      address: '인천 중구 공항로 207 인천국제공항역',
      latitude: '',
      longitude: '',
      category: '',
      phone: '',
      recommended: false
    }
  ],
  likes: 12,
  isLiked: false,
  isBookmarked: false,
  nickname: 'Jinist',
  profileImage: '',
  createdAt: '',
  updatedAt: ''
};

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
          <CourseDetailHeader>
            <CourseTitle>
              <Title level={2} size="sm" fontWeight={700} block>
                {courseData.title}
              </Title>
              <HeaderButtons>
                <button>수정</button>
                <button>삭제</button>
              </HeaderButtons>
            </CourseTitle>
            <Text color="gray">
              업로드 날짜: {courseData.createdAt} 수정된 날짜: {courseData.updatedAt}
            </Text>
            <Profile>
              <Avatar size={66} />
              <Text color="dark" fontWeight={500}>
                {courseData.nickname}
              </Text>
            </Profile>
          </CourseDetailHeader>

          <CourseDetails>
            <CourseOverview
              themes={courseData.themes}
              period={courseData.period}
              region={courseData.region}
              courseCount={courseData.places.length}
              spots={courseData.spots}
            />
          </CourseDetails>
          <TravelRoute>
            <Title>여행경로</Title>
            <Image src="/assets/location/jeju.jpg" alt="여행경로" />
          </TravelRoute>
          <TravelCourse>
            <Title>다녀온 코스</Title>
            <div>슬라이드 이미지 넣기</div>
          </TravelCourse>
          <CourseDetailList places={courseData.places} />
          <Comment />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default CourseDetail;

const { fontGray, mainBackground } = theme.color;

const CourseDetailHeader = styled.div`
  position: relative;
  margin-top: 40px;
`;
const CourseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const HeaderButtons = styled.div`
  button {
    color: ${fontGray};
    font-size: 16px;
    margin-left: 8px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  margin-bottom: 70px;
`;
const CourseDetails = styled.div``;

const TravelRoute = styled.div``;
const TravelCourse = styled.div``;
