import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Link, PageContainer, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import CourseDetailList from '~/components/domain/CourseDetail/CourseDetailList';
import CourseOverview from '~/components/domain/CourseDetail/CourseOverview';
import CourseSlider from '~/components/domain/CourseSlider';
import CourseMap from '~/components/domain/Map/CourseMap';
import { useUser } from '~/hooks/useUser';
import { CourseApi } from '~/service';
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
  userId: number;
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
  phoneNumber: string;
  imageUrl: string;
  isRecommended: boolean;
  isThumbnail: boolean;
}

const CourseDetail: NextPage = () => {
  /* TODO
    1. 추천 아이콘 작업
    2. 업로드, 수정 날짜 가공하여 적용
    3. 수정/삭제 버튼 구현
  */
  const { currentUser, isLoggedIn } = useUser();
  const [detailData, setDetailData] = useState<ICourseData | null>(null);

  const router = useRouter();
  const courseId = router.query.id;

  const getDetailInfo = async (courseId: string) => {
    if (isLoggedIn) {
      const result = await CourseApi.authRead(courseId);
      setDetailData(result);
    } else {
      const result = await CourseApi.read(courseId);
      setDetailData(result);
    }
  };

  useEffect(() => {
    if (typeof courseId === 'string') {
      getDetailInfo(courseId);
      return;
    }
    router.push('/');
  }, [courseId, router]);

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer type="detail" style={{ position: 'relative' }}>
          <CourseDetailHeader>
            <CourseTitle>
              <Title level={2} size="lg" fontWeight={700} block>
                {detailData?.title}
              </Title>
              {currentUser.user.id === detailData?.userId && (
                <HeaderButtons>
                  <button>수정</button>
                  <button>삭제</button>
                </HeaderButtons>
              )}
            </CourseTitle>
            <Text color="gray">
              업로드 날짜: {detailData?.createdAt} 수정된 날짜: {detailData?.updatedAt}
            </Text>
            <Profile>
              <Link href={`/userinfo/${detailData?.userId}`}>
                <Avatar size={66} />
              </Link>
              <Text color="dark" fontWeight={500}>
                {detailData?.nickname}
              </Text>
            </Profile>
          </CourseDetailHeader>

          <CourseDetails>
            <CourseOverview
              themes={detailData?.themes}
              period={detailData?.period}
              region={detailData?.region}
              courseCount={detailData?.places.length}
              spots={detailData?.spots}
            />

            <TravelRoute>
              <DetailTitle size="md" fontWeight={700}>
                여행경로
              </DetailTitle>
              {/* <CourseMap course={courseMapData} /> */}
            </TravelRoute>
            <TravelCourse>
              <DetailTitle size="md" fontWeight={700}>
                다녀온 코스
              </DetailTitle>
              <CourseSlider places={detailData?.places} />
            </TravelCourse>
            <CourseDetailList places={detailData?.places} />
          </CourseDetails>
          <Comment />
          <DetailSidebar
            likes={detailData?.likes}
            isLiked={detailData?.isLiked}
            isBookmarked={detailData?.isBookmarked}
          />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default CourseDetail;

const { fontGray } = theme.color;

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
const CourseDetails = styled.div`
  margin-bottom: 100px;
`;

const DetailTitle = styled(Title)`
  margin-top: 110px;
  margin-bottom: 28px;
`;

const TravelRoute = styled.div``;
const TravelCourse = styled.div``;
