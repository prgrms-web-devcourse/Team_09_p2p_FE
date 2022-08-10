import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Icon, Image, PageContainer, Text, Title } from '~/components/atom';
import { CourseList } from '~/components/common';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import { useUser } from '~/hooks/useUser';
import { PlaceApi } from '~/service';
import theme from '~/styles/theme';
import { PlacePost } from '~/types';

// ssr로 변경할 때 사용
// export const getServerSideProps = async (context: NextPageContext) => {
//   const { id } = context.query;

//   const placeId = Number(id);
//   if (!placeId && !Number.isNaN(placeId)) {
//     return {
//       notFound: true
//     };
//   }

//   try {
//     const place = await PlaceApi.read(placeId);
//     return {
//       props: { place }
//     };
//   } catch (e) {
//     return {
//       notFound: true
//     };
//   }
// };

// interface Props {
//   place: PlacePost;
// }

const PlaceDetailByPostId = () => {
  const [relevantCourses, setRelevantCourses] = useState([]);
  const { isLoggedIn } = useUser();
  const [detailData, setDetailData] = useState<PlacePost | null>(null);

  const router = useRouter();
  const placeId = Number(router.query.id);

  const getDetailInfo = async (courseId: number) => {
    if (isLoggedIn) {
      const result = await PlaceApi.read(placeId);
      console.log(result, 'place');

      if (!result) {
        // 임시로 값 없을 경우 처리
        router.push('/404');
        return;
      }

      setDetailData(result);
    } else {
      const result = await PlaceApi.read(courseId);

      if (!result) {
        router.push('/');
        return;
      }

      setDetailData(result);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      if (!Number.isNaN(placeId)) {
        getDetailInfo(placeId);
        return;
      }

      router.push('/404');
    }
  }, [placeId, isLoggedIn]);

  if (!detailData) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="place detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container type="detail" style={{ position: 'relative' }}>
          <PostHeader>
            <Title level={1} size="lg" fontWeight={700} block>
              {detailData.name}
            </Title>
          </PostHeader>
          <Text block color="gray">
            {detailData.addressName}
          </Text>
          <Text size="lg" block>
            <b style={{ color: `${theme.color.mainColor}` }}>{detailData.usedCount}개의 여행코스</b>
            에 포함된 장소입니다.
          </Text>
          <Button width="140px" style={{ padding: '5px', fontWeight: '500' }}>
            지도보기 <Icon name="arrowDown" />
          </Button>
          <ContentContainer>
            <Image src="/assets/location/jeju.jpg" alt="여행경로" />
          </ContentContainer>
          <Title level={2} size="sm">
            이 장소가 포함된 코스
          </Title>
          {/* <CourseList courses={relevantCourses} /> */}
          <Comment id={detailData.id} type="place" />
          <HorizonDivideLine />
          <DetailSidebar
            likes={detailData.likeCount}
            id={detailData.id}
            defaultLiked={detailData.liked}
            defaultBookmarked={detailData.bookmarked}
            type="place"
          />
        </Container>
      </main>
    </React.Fragment>
  );
};

export default PlaceDetailByPostId;

const Container = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 40px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.section`
  margin: 20px 0;
`;

const HorizonDivideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.backgroundDarkGray};
`;
