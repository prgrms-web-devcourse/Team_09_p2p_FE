import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Icon, Image, PageContainer, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Comment from '~/components/common/Comment';
import CourseOverview from '~/components/domain/CourseDetail/CourseOverview';
import theme from '~/styles/theme';

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
                [1박 2일] 제주도 여행 추천!!!
              </Title>
              <HeaderButtons>
                <button>수정</button>
                <button>삭제</button>
              </HeaderButtons>
            </CourseTitle>
            <Text color="gray">업로드 날짜: / 수정된 날짜:</Text>
            <Profile>
              <Avatar size={66} />
              <Text color="dark" fontWeight={500}>
                Jinist
              </Text>
            </Profile>
          </CourseDetailHeader>

          <CourseDetails>
            <CourseOverview />
          </CourseDetails>
          <TravelRoute>
            <Title>여행경로</Title>
            <Image src="/assets/location/jeju.jpg" alt="여행경로" />
          </TravelRoute>
          <TravelCourse>
            <Title>다녀온 코스</Title>
            <div>슬라이드 이미지 넣기</div>
          </TravelCourse>
          <CourseDetailList>
            <CourseDetailItem>
              <CourseDetailTitle>
                <Title>1. 인천공항</Title>
                <button>추천 아이콘</button>
              </CourseDetailTitle>
              <Text>인천 중구 공항로 207 인천국제공항역</Text>
              <Image src="/assets/location/jeju.jpg" alt="인천공항" />
              <CourseDescription>
                <p>출발은 인천공항에서 했습니다~~</p>
              </CourseDescription>
            </CourseDetailItem>
          </CourseDetailList>
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
const CourseDetailList = styled.div``;
const CourseDetailItem = styled.div``;
const CourseDetailTitle = styled.div``;
const CourseDescription = styled.div``;
