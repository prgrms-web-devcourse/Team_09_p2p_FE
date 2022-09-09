import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '~/styles/theme';
import { NextPageContext } from 'next';
import { PageContainer } from '~/components/atom';
import PageHead from '~/components/common/PageHead';
import {
  ToggleMap,
  PostDescription,
  PostHeader,
  RelevantCourses,
  PlaceSlider
} from '~/components/domain/Place';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import { useUser } from '~/hooks/useUser';
import { CourseApi, PlaceApi } from '~/service';
import { PlacePost } from '~/types';
import { ICourseItem } from '~/types/course';

const COURSE_SORT = '최신순';
const COURSE_SIZE = 9;

export const getServerSideProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const placeId = Number(id);

  if (Number.isNaN(placeId)) {
    return {
      notFound: true
    };
  }

  try {
    const place = await PlaceApi.read(placeId);
    const courses = await CourseApi.getCourses({
      placeId,
      size: COURSE_SIZE,
      sorting: COURSE_SORT
    });
    return {
      props: { place, placeId, courses: courses.content }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

interface Props {
  place: PlacePost;
  placeId: number;
  courses: ICourseItem[];
}

const PlaceDetailByPostId = ({ place, placeId, courses }: Props) => {
  const [relevantCourses, setRelevantCourses] = useState(courses || []);
  const { isLoggedIn } = useUser();
  const [detailData, setDetailData] = useState<PlacePost | null>(place);

  const getDetailInfo = async () => {
    const places = await PlaceApi.read(placeId);

    setDetailData(places);

    const courses = await CourseApi.getCourses({
      placeId,
      size: COURSE_SIZE,
      sorting: COURSE_SORT
    });
    setRelevantCourses(courses.content);
  };

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태일 경우 유저용 데이터 받아오기
      getDetailInfo();
    }
  }, [placeId, isLoggedIn]);

  if (!detailData) {
    return null;
  }

  return (
    <React.Fragment>
      <PageHead title={place.name} />
      <main>
        <Container type="detail" style={{ position: 'relative' }}>
          <PostHeader
            name={detailData.name}
            address={detailData.roadAddressName || detailData.addressName}
          />
          <PostDescription usedCount={detailData.usedCount} />
          <ToggleMap
            placeId={Number(detailData.kakaoMapId)}
            placeType={detailData.category}
            placeName={detailData.name}
            latitude={Number(detailData.latitude)}
            longitude={Number(detailData.longitude)}
          />
          <PlaceSlider images={detailData.imageUrls} name={detailData.name} />
          {relevantCourses.length > 0 && (
            <RelevantCourses placeId={placeId} courses={relevantCourses} />
          )}
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

const HorizonDivideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.backgroundDarkGray};
`;
