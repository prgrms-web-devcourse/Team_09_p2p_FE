import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CourseList, Toast } from '~/components/common';
import MyBookmarks from '~/components/domain/UserInfo/MyBookmarks';
import MyComments from '~/components/domain/UserInfo/MyComments';
import ProfileCard from '~/components/domain/UserInfo/ProfileCard';
import Tab from '~/components/domain/UserInfo/Tab';
import { useUser } from '~/hooks/useUser';
import { CommentApi, CourseApi, PlaceApi, UserApi } from '~/service';
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
  email: string;
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

  /*
    TODO: 현재 탭 부분 데이터 요청시 등록된 값 전부 가져오는데
    끊어서 가져와야 함
  */

  const replaceRoute = (query: UserInfoTab) => {
    router.replace({ pathname: '/userinfo/[id]', query: { tab: query } }, `/userinfo/${userId}`);
  };

  const onClickAction = async (value: UserInfoTab) => {
    setActiveMenu(value);

    if (value === 'course') {
      if (!courseData || userData?.id !== userId) {
        // userId 변경될 경우 재요청
        const result = await CourseApi.getUserCourses(userId);
        setCourseData(result.content);
      }

      replaceRoute('course');
    }

    if (value === 'bookmark') {
      onClickBookmarkTab('course');
      replaceRoute('bookmark');
    }

    if (value === 'comment') {
      if (!commentData) {
        const result = await CommentApi.getCommentsAll(userId);
        setCommentData(result.content);
      }

      replaceRoute('comment');
    }
  };

  const onClickBookmarkTab = async (value: UserInfoTab) => {
    setActiveBookmark(value);

    if (value === 'course' && !bookmarkData.course) {
      const result = await CourseApi.getBookmarked(userId);
      setBookmarkData({ ...bookmarkData, course: result.content });
    }

    if (value === 'place' && !bookmarkData.places) {
      const result = await PlaceApi.getBookmarked(userId);
      setBookmarkData({ ...bookmarkData, places: result.content });
    }
  };

  const getUserData = async (userId: number) => {
    const result = await UserApi.getUser(userId);
    if (!result) {
      Toast.show('잘못된 요청입니다.');
      router.push('/');
      return;
    }

    setUserData(result);

    const tab = router.query.tab || 'course';
    onClickAction(tab as UserInfoTab);
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      if (Number.isNaN(userId)) {
        Toast.show('잘못된 요청입니다.');
        router.push('/');
        return;
      }
      getUserData(userId);

      // 유저 id 변경되면 bookmark/comment 초기화
      setBookmarkData({
        course: null,
        places: null
      });
      setCommentData(null);
    }
  }, [userId]);

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
              email={userData.email}
              onClickAction={onClickAction}
              postCount={userData.counts.course}
              bookmarkCount={userData.counts.bookmarks.total}
              commentCount={userData.counts.comments}
              isMyPage={isMyPage}
            />
            <ActionContent>
              <TabContainer>
                <Tab onActive={onClickAction} active={ActiveMenu}>
                  <Tab.item title="게시물" value="course">
                    {courseData && <CourseList grid={2} courses={courseData} />}
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
                      {commentData && <MyComments comments={commentData} />}
                    </Tab.item>
                  )}
                </Tab>
              </TabContainer>
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

const TabContainer = styled.ul`
  margin-bottom: 100px;
`;
