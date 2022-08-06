import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Button, Icon, Image, PageContainer, Text, Title } from '~/components/atom';
import { CourseList } from '~/components/common';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import theme from '~/styles/theme';
import { PlacePost } from '~/types';

// DUMMY DATA
const DUMMY_PLACE_POSTS: PlacePost[] = [
  {
    id: 1,
    name: '도렐 제주본점',
    addressName: '제주 서귀포시 성산읍 동류암로 20 플레이스 내 LOVE동',
    roadAddressName: '',
    latitude: '',
    longitude: '',
    category: '',
    phoneNumber: '010-1234-5678',
    imageUrl: '',
    liked: true,
    bookmarked: true,
    likeCount: 154,
    usedCount: 12
  },
  {
    id: 2,
    name: '꽃돌게장1번가',
    addressName: '전라남도 여수시 봉산2로 36',
    roadAddressName: '전라남도 여수시 봉산동 210-2',
    latitude: '',
    longitude: '',
    category: '',
    phoneNumber: '061-644-0003',
    imageUrl: '',
    liked: false,
    bookmarked: false,
    likeCount: 99,
    usedCount: 5
  }
];

// DUMMY API
const getPlacePost = (id: number) => {
  return new Promise((resolve, reject) => {
    const data = DUMMY_PLACE_POSTS.find((post) => post.id === id);
    setTimeout(() => {
      data ? resolve(data) : reject('error');
    }, 1000);
  });
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { postId } = context.query;
  if (!postId || Array.isArray(postId)) {
    throw new Error('잘못된 요청입니다.');
  }
  try {
    const post = await getPlacePost(parseInt(postId, 10));
    return {
      props: { post }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

interface Props {
  post: PlacePost;
}

const PlaceDetailByPostId = ({ post }: Props) => {
  const [relevantCourses, setRelevantCourses] = useState([]);

  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="place detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container type="detail" style={{ position: 'relative' }}>
          <DetailSidebar
            likes={post.likeCount}
            isLiked={post.liked}
            isBookmarked={post.bookmarked}
          />
          <PostHeader>
            <Title level={1} size="lg" fontWeight={700} block>
              {post.name}
            </Title>
            <UserButtons>
              <button>수정</button>
              <button>삭제</button>
            </UserButtons>
          </PostHeader>
          <Text block color="gray">
            {post.addressName}
          </Text>
          <Text size="lg" block>
            <b style={{ color: `${theme.color.mainColor}` }}>{post.usedCount}개의 여행코스</b>에
            포함된 장소입니다.
          </Text>
          <Button width="140px" style={{ padding: '5px', fontWeight: '500' }}>
            지도보기 <Icon name="arrowDown" />
          </Button>
          <ContentContainer>
            <Image src="/assets/location/jeju.jpg" alt="여행경로" />
            <div>어쩌구저쩌구</div>
          </ContentContainer>
          <Title level={2} size="sm">
            이 장소가 포함된 코스
          </Title>
          <CourseList courses={relevantCourses} />
          <HorizonDivideLine />
          <Comment />
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

const UserButtons = styled.div`
  button {
    color: ${theme.color.fontGray};
    font-size: 16px;
    margin-left: 8px;
  }
`;

const ContentContainer = styled.section`
  margin: 20px 0;
`;

const HorizonDivideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.backgroundDarkGray};
`;
