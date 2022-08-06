import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Icon, Text } from '~/components/atom';
import { CourseApi, LikesApi } from '~/service';
import theme from '~/styles/theme';

interface DetailSidebarProps {
  likes?: number;
  defaultLiked?: boolean;
  defaultBookmarked?: boolean;
  isLoggedIn?: boolean;
}
/*
  TODO: 
  1. 코스와 장소페이지의 처리가 다르게 되도록 구현
  2. API 완성될 경우 실제 요청 보내도록 처리

*/

const DetailSidebar = ({
  likes = 0,
  defaultLiked,
  defaultBookmarked,
  isLoggedIn
}: DetailSidebarProps) => {
  const [isLiked, setIsLiked] = useState(defaultLiked);
  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);
  const [totalLikes, setTotalLikes] = useState(likes);
  const router = useRouter();

  const handleClickLike = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // const result = await LikesApi.likeCourse(id);
    setIsLiked(!isLiked);
    setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1);
  };

  const handleClickBookmark = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // const result = await LikesApi.likeCourse(id);
    setIsBookmarked(!isBookmarked);
  };

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

        <IconButton onClick={handleClickBookmark}>
          {isBookmarked ? (
            <Icon name="bookmarkActive" size={28} />
          ) : (
            <Icon name="bookmarkInactive" size={28} />
          )}
        </IconButton>

        <IconButton>
          <Icon name="share" size={28} />
        </IconButton>
      </Sticky>
    </Container>
  );
};

export default DetailSidebar;

const { borderDarkGray } = theme.color;

const Container = styled.div`
  position: absolute;
  top: -18px;
  right: -100px;
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
