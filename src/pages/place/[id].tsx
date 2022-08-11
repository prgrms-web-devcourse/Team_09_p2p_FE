import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Icon, Link, PageContainer, Text, Title } from '~/components/atom';
import { CourseList } from '~/components/common';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import ImageViewer from '~/components/common/ImageViewer';
import PlaceMap from '~/components/domain/Map/PlaceMap';
import RelevantCourses from '~/components/domain/Place/RelevantCourses';
import { useUser } from '~/hooks/useUser';
import { CourseApi, PlaceApi } from '~/service';
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
  const [isOpenMap, setIsOpenMap] = useState(false);

  const router = useRouter();
  const placeId = Number(router.query.id);

  const getDetailInfo = async (courseId: number) => {
    if (isLoggedIn) {
      const places = await PlaceApi.read(placeId);

      if (!places) {
        router.push('/404');
        return;
      }

      console.log(places);
      setDetailData(places);
    } else {
      const places = await PlaceApi.read(courseId);

      if (!places) {
        router.push('/');
        return;
      }

      setDetailData(places);
    }

    const courses = await CourseApi.getCourses({ placeId, size: 3 });
    setRelevantCourses(courses.content);
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
            <Text size="md" block color="gray">
              {detailData.roadAddressName || detailData.addressName}
            </Text>
          </PostHeader>
          <Description size="lg" block>
            <Text color="main" size="lg" fontWeight={700}>
              {detailData.usedCount}개의 여행코스
            </Text>
            에 포함된 장소입니다.
          </Description>
          <MapButton width="140px" size="sm" onClick={() => setIsOpenMap(!isOpenMap)}>
            지도보기{' '}
            {isOpenMap ? <Icon name="arrowDown" rotate={180} /> : <Icon name="arrowDown" />}
          </MapButton>
          {detailData && isOpenMap && (
            <PlaceMap
              placeId={detailData.id}
              placeType={detailData.category}
              placeName={detailData.name}
              center={{ lat: Number(detailData.latitude), lng: Number(detailData.longitude) }}
            />
          )}
          <ContentContainer>
            <ImageViewer src={detailData.imageUrl} alt={detailData.name} />
          </ContentContainer>
          <RelevantContainer>
            {/* 검색 결과로 이동 시켜야함 */}
            <RelevantHeader>
              <Title size="sm">이 장소가 포함된 코스</Title>
              <Link href="/">
                <Text color="gray">전체보기</Text>
              </Link>
            </RelevantHeader>
            <RelevantCourses courses={relevantCourses} />
          </RelevantContainer>
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
  flex-direction: column;
  gap: 6px;
`;

const ContentContainer = styled.section`
  margin: 20px 0;
`;

const HorizonDivideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.backgroundDarkGray};
`;

const MapButton = styled(Button)`
  margin-top: 4px;
`;

const RelevantContainer = styled.div`
  margin-top: 30px;
  padding: 50px 0;
  border-top: 1px solid ${theme.color.borderGray};
`;

const RelevantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled(Text)`
  margin-top: 4px;
`;
