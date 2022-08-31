import styled from '@emotion/styled';
import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '~/components/atom';
import { CourseList } from '~/components/common';
import MyBookmarks from '~/components/domain/UserInfo/MyBookmarks';
import MyComments from '~/components/domain/UserInfo/MyComments';
import ProfileCard from '~/components/domain/UserInfo/ProfileCard';
import Tab from '~/components/domain/UserInfo/Tab';
import { useUser } from '~/hooks/useUser';
import { CommentApi, CourseApi, PlaceApi, UserApi } from '~/service';
import type { UserInfoTab } from '~/components/domain/UserInfo/types';
import PageHead from '~/components/common/PageHead';

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

export const getServerSideProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return {
      notFound: true
    };
  }

  try {
    const user = await UserApi.getUser(userId);
    return {
      props: { user, userId }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

interface UserInfoProps {
  user: IUserInfo;
  userId: number;
}

const Userinfo = ({ user, userId }: UserInfoProps) => {
  const [ActiveMenu, setActiveMenu] = useState('post');
  const [ActiveBookmark, setActiveBookmark] = useState('course');
  const [userData, setUserData] = useState<IUserInfo>(user);
  const router = useRouter();
  const { currentUser } = useUser();

  const [bookmarkData, setBookmarkData] = useState({
    course: null,
    places: null
  });
  const [commentData, setCommentData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const isMyPage = userId === currentUser.user.id;

  /*
    TODO: 현재 탭 부분 데이터 요청시 등록된 값 전부 가져오는데
    끊어서 가져와야 함
  */

  const replaceRoute = (query: UserInfoTab) => {
    router.replace(
      { pathname: '/userinfo/[id]', query: { tab: query } },
      `/userinfo/${userId}?tab=${query}`,
      {
        shallow: true
      }
    );
  };

  const onClickAction = async (value: UserInfoTab, isFirst?: boolean) => {
    setActiveMenu(value);

    if (value === 'course') {
      if (!courseData || isFirst) {
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

  useEffect(() => {
    // 유저 id 변경되면 bookmark/comment 초기화
    setBookmarkData({
      course: null,
      places: null
    });
    setCommentData(null);

    setUserData(user);
    const tab = router.query.tab || 'course';
    onClickAction(tab as UserInfoTab, true);

    // 뒤로가기 시 state 초기화
    router.beforePopState(({ as, options }) => {
      if (options.shallow) {
        router.replace(as);
        setCourseData(null);
        setBookmarkData({
          course: null,
          places: null
        });
        setCommentData(null);
        return false;
      }
      return true;
    });
  }, [userId]);

  return (
    <React.Fragment>
      <PageHead title={`${userData.nickname}님의 페이지`} />
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
