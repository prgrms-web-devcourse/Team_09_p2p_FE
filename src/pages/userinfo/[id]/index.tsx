import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CourseList } from '~/components/common';
import MyComments from '~/components/domain/UserInfo/MyComments';
import ProfileCard from '~/components/domain/UserInfo/ProfileCard';
import Tab from '~/components/domain/UserInfo/Tab';
import { courseListData } from '~/utils/dummydata';

export type IComment = {
  id: number;
  rootId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  recommentCount: number;
  content: {
    id: number;
    type: string; //ex) courses or places
    title: string;
  };
};

const courseCommentData = [
  {
    id: 1,
    rootId: '2',
    comment: '코스 구경 잘하고 갑니다~~ 따봉~~따봉따봉~',
    createdAt: '2022-08-03',
    updatedAt: '',
    recommentCount: 3,
    content: {
      id: 3,
      type: 'course', //ex) courses or places
      title: '[1박 2일] 제주도 여행 추천'
    }
  }
];

const Userinfo: NextPage = () => {
  const [ActiveMenu, setActiveMenu] = useState('post');
  const router = useRouter();

  const currentUserId = 1; // 전역데이터라고 가정
  const isMyPage = Number(router.query.id) === currentUserId;

  const onClickAction = (value: string) => {
    setActiveMenu(value);
  };

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <Wrapper>
            <ProfileCard
              profileImage=""
              nickname="Jinist"
              email="325days@naver.com"
              onClickAction={onClickAction}
              postCount={1}
              bookmarkCount={2}
              commentCount={3}
              isMyPage={isMyPage}
            />
            <ActionContent>
              <ul>
                <Tab onActive={onClickAction} active={ActiveMenu}>
                  <Tab.item title="게시물" value="post">
                    <CourseList grid={2} courses={courseListData} />
                  </Tab.item>
                  <Tab.item title="북마크" value="bookmark">
                    <CourseList grid={2} courses={courseListData} />
                  </Tab.item>
                  {isMyPage && (
                    <Tab.item title="댓글" value="comment">
                      <MyComments comments={courseCommentData} />
                    </Tab.item>
                  )}
                </Tab>
              </ul>
              <div></div>
            </ActionContent>
          </Wrapper>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default Userinfo;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 38px;
`;
const ActionContent = styled.div`
  padding-left: 400px;
`;
