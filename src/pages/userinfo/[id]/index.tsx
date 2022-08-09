import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CourseList, PlaceList } from '~/components/common';
import MyBookmarks from '~/components/domain/UserInfo/MyBookmarks';
import MyComments from '~/components/domain/UserInfo/MyComments';
import ProfileCard from '~/components/domain/UserInfo/ProfileCard';
import Tab from '~/components/domain/UserInfo/Tab';
import { useUser } from '~/hooks/useUser';
import { UserApi } from '~/service';
import { courseListData, placeListData } from '~/utils/dummydata';

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

interface IBookmarkCounts {
  total: number;
  courseBookmark: number;
  placeBookmark: number;
}
interface ICounts {
  course: number;
  comments: number;
  bookmarks: IBookmarkCounts;
}
interface IUserInfo {
  id: number;
  nickname: string;
  profileImage: string | null;
  birth: string;
  sex: string;
  createdAt: string;
  counts: ICounts;
}

const Userinfo: NextPage = () => {
  const [ActiveMenu, setActiveMenu] = useState('post');
  const [ActiveBookmark, setActiveBookmark] = useState('course');
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const router = useRouter();
  const { currentUser } = useUser();

  const userId = Number(router.query.id);
  const isMyPage = userId === currentUser.user.id;

  const onClickAction = (value: string) => {
    setActiveMenu(value);
  };

  const onClickBookmarkTab = (value: string) => {
    setActiveBookmark(value);
  };

  const getUserData = async (userId: number) => {
    const result = await UserApi.getUser(userId);
    if (!result) {
      alert('잘못된 요청입니다.');
      router.push('/');
      return;
    }

    setUserData(result);
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      if (Number.isNaN(userId)) {
        alert('잘못된 요청입니다.');
        router.push('/');
        return;
      }

      getUserData(userId);
    }
  }, [userId, router]);

  if (!userData) {
    return null;
  }
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
              profileImage={userData.profileImage}
              userId={userData.id}
              nickname={userData.nickname}
              email={userData.birth}
              onClickAction={onClickAction}
              postCount={userData.counts.course}
              bookmarkCount={userData.counts.bookmarks.total}
              commentCount={userData.counts.comments}
              isMyPage={isMyPage}
            />
            <ActionContent>
              <ul>
                <Tab onActive={onClickAction} active={ActiveMenu}>
                  <Tab.item title="게시물" value="post">
                    <CourseList grid={2} courses={courseListData} />
                  </Tab.item>
                  <Tab.item title="북마크" value="bookmark">
                    <MyBookmarks
                      courses={courseListData}
                      places={placeListData}
                      onActive={onClickBookmarkTab}
                      active={ActiveBookmark}
                    />
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
