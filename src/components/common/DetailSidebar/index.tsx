import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon, Text } from '~/components/atom';
import KakaoButton from '~/components/domain/CourseDetail/KakaoButton';
import useMoveScroll from '~/hooks/useMoveScroll';
import { useUser } from '~/hooks/useUser';
import { BookmarkApi, LikeApi } from '~/service';
import theme from '~/styles/theme';
import { CourseOrPlace } from '~/types';
import ConfirmModal from '../ConfirmModal';

interface DetailSidebarProps {
  likes?: number;
  comments?: number;
  id: number;
  defaultLiked?: boolean;
  defaultBookmarked?: boolean;
  type: CourseOrPlace;
}

const DetailSidebar = ({
  likes = 0,
  comments = 0,
  id,
  defaultLiked,
  defaultBookmarked,
  type
}: DetailSidebarProps) => {
  const { isLoggedIn } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(defaultLiked);
  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);
  const [totalLikes, setTotalLikes] = useState(likes);
  const router = useRouter();
  const { onMoveToElement } = useMoveScroll(document.getElementById('comment'));

  const handleGoLogin = () => {
    setModalVisible(false);
    router.push('/login');
  };

  const handleClickLike = async () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }

    const result = await LikeApi.like(id, type);
    setIsLiked(result.isLiked);
    setTotalLikes((oldLikes) => (result.isLiked ? oldLikes + 1 : oldLikes - 1));
  };

  const handleClickBookmark = async () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    const result = await BookmarkApi.bookmark(id, type);
    setIsBookmarked(result.isBookmarked);
  };

  useEffect(() => {
    setIsLiked(defaultLiked);
    setIsBookmarked(defaultBookmarked);
    // 로그인 유저의 데이터로 변경되었을 때를 위해 default값 감지
  }, [defaultLiked, defaultBookmarked]);

  return (
    <Container>
      <Sticky>
        <IconButton onClick={handleClickLike}>
          {isLiked ? (
            <Icon name="heartActive" size={32} />
          ) : (
            <Icon name="heartInactive" size={32} />
          )}
        </IconButton>
        <Text color="darkGray" style={{ marginTop: 8 }}>
          {totalLikes}
        </Text>
        <IconButton onClick={onMoveToElement}>
          <Icon name="commentRound" size={32} />
        </IconButton>
        <Text color="darkGray" style={{ marginTop: 8 }}>
          {comments}
        </Text>

        <IconButton onClick={handleClickBookmark}>
          {isBookmarked ? (
            <Icon name="bookmarkActive" size={28} />
          ) : (
            <Icon name="bookmarkInactive" size={28} />
          )}
        </IconButton>

        <KakaoButton />
      </Sticky>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleGoLogin}
        message="로그인이 필요한 서비스입니다."
        subMessage="로그인 페이지로 이동할까요?"
      />
    </Container>
  );
};

export default DetailSidebar;

const { borderDarkGray } = theme.color;

const Container = styled.div`
  position: absolute;
  top: -18px;
  right: -134px;
  bottom: 0;
  text-align: center;
`;

const Sticky = styled.div`
  position: sticky;
  top: 110px;
  padding-top: 1px;
`;

const IconButton = styled.button`
  width: 66px;
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  border: 1px solid ${borderDarkGray};
  margin-top: 20px;
  box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%);
  transition: all 0.3s;

  &:hover {
    border-color: #adadad;
  }
`;
