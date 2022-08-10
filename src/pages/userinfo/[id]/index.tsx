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
import { CommentApi, CourseApi, PlaceApi, UserApi } from '~/service';
import { courseListData } from '~/utils/dummydata';
import type { UserInfoTab } from '~/components/domain/UserInfo/types';

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

  const [bookmarkData, setBookmarkData] = useState({
    course: null,
    places: null
  });
  const [commentData, setCommentData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const userId = Number(router.query.id);
  const isMyPage = userId === currentUser.user.id;

  const onClickAction = async (value: UserInfoTab) => {
    console.log(value);
    setActiveMenu(value);

    if (value === 'bookmark') {
      onClickBookmarkTab('course');
    }
    if (value === 'course') {
      const result = await CommentApi.getCommentsAll(userId);
      console.log('[내가 작성한 코스]', result);
    }

    if (value === 'comment') {
      const result = await CommentApi.getCommentsAll(userId); // 일단 전부 요청
      console.log('[내가 작성한 댓글]', result);
      setCommentData(result.content);
    }
  };

  const onClickBookmarkTab = async (value: UserInfoTab) => {
    setActiveBookmark(value);

    if (value === 'course' && bookmarkData.course === null) {
      const result = await CourseApi.getBookmarked(userId);
      setBookmarkData({ ...bookmarkData, course: result.content });
    }

    if (value === 'place' && bookmarkData.places === null) {
      const result = await PlaceApi.getBookmarked(userId);
      setBookmarkData({ ...bookmarkData, places: result.content });
    }
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
                      courses={bookmarkData.course}
                      places={bookmarkData.places}
                      onActive={onClickBookmarkTab}
                      active={ActiveBookmark}
                    />
                  </Tab.item>
                  {isMyPage && (
                    <Tab.item title="댓글" value="comment">
                      <MyComments comments={commentData} />
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
