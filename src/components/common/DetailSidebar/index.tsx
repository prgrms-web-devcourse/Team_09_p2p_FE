import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Icon, Text } from '~/components/atom';
import KakaoButton from '~/components/domain/CourseDetail/KakaoButton';
import useMoveScroll from '~/hooks/useMoveScroll';
import { useUser } from '~/hooks/useUser';
import { BookmarkApi, LikeApi } from '~/service';
import { CourseOrPlace } from '~/types';
import ConfirmModal from '../ConfirmModal';
import SideButton from './SideButton';
import ToggleButton from './SideToggleButton';

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
  defaultLiked = false,
  defaultBookmarked = false,
  type
}: DetailSidebarProps) => {
  const { isLoggedIn } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes);
  const router = useRouter();
  const { onMoveToElement } = useMoveScroll('comment');

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
    setTotalLikes((oldLikes) => (result.isLiked ? oldLikes + 1 : oldLikes - 1));
  };

  const handleClickBookmark = async () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    await BookmarkApi.bookmark(id, type);
  };

  return (
    <Container>
      <Sticky>
        <ToggleButton
          active="heartActive"
          inactive="heartInactive"
          size={32}
          onClick={handleClickLike}
          defaultValue={defaultLiked}
          isLoggedIn={isLoggedIn}
        />
        <CountText color="darkGray">{totalLikes}</CountText>
        <SideButton onClick={onMoveToElement}>
          <Icon name="commentRound" size={32} />
        </SideButton>
        <CountText color="darkGray">{comments}</CountText>
        <ToggleButton
          active="bookmarkActive"
          inactive="bookmarkInactive"
          size={28}
          onClick={handleClickBookmark}
          defaultValue={defaultBookmarked}
          isLoggedIn={isLoggedIn}
        />
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

const CountText = styled(Text)`
  margin-top: 8px;
`;
