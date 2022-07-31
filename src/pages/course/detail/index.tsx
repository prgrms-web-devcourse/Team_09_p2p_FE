import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Icon, Image, PageContainer, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
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
          <CourseDetailHeader>
            <Title>[1박 2일] 제주도 여행 추천!!!</Title>
            <Text>업로드 날짜: / 수정된 날짜:</Text>
            <HeaderButtons>
              <button>수정</button>
              <button>삭제</button>
            </HeaderButtons>
          </CourseDetailHeader>
          <Profile>
            <Avatar size={66} />
            <Text>Jinist</Text>
          </Profile>
          <CourseDetails>
            <CourseOverview>
              <CourseInfo>
                <li>
                  <Icon name="marker" />
                  <Text>여행지역</Text>
                  <Text>제주</Text>
                </li>
                <li>
                  <Icon name="calendar" />
                  <Text>여행기간</Text>
                  <Text>당일</Text>
                </li>
                <li>
                  <Icon name="route" />
                  <Text>총 코스</Text>
                  <Text>5코스</Text>
                </li>
              </CourseInfo>

              <CourseInfoDetail>
                <li>
                  <Text>여행테마</Text>
                  <Text>#데이트코스 #힐링 #나혼자여행</Text>
                </li>
                <li>
                  <Text>포함장소</Text>
                  <Text>카페, 바다, 테마파크, 음식점</Text>
                </li>
              </CourseInfoDetail>
            </CourseOverview>
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

const CourseDetailHeader = styled.div``;
const HeaderButtons = styled.div``;
const Profile = styled.div``;
const CourseDetails = styled.div``;
const CourseOverview = styled.section``;
const CourseInfo = styled.ul``;
const CourseInfoDetail = styled.ul``;
const TravelRoute = styled.div``;
const TravelCourse = styled.div``;
const CourseDetailList = styled.div``;
const CourseDetailItem = styled.div``;
const CourseDetailTitle = styled.div``;
const CourseDescription = styled.div``;
