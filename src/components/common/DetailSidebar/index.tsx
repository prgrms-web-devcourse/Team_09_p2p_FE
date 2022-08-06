import styled from '@emotion/styled';
import { Icon, Text } from '~/components/atom';
import theme from '~/styles/theme';

interface DetailSidebarProps {
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const DetailSidebar = ({ likes = 0, isLiked, isBookmarked }: DetailSidebarProps) => {
  return (
    <Container>
      <Sticky>
        <IconButton>
          {isLiked ? (
            <Icon name="heartActive" size={32} />
          ) : (
            <Icon name="heartInactive" size={32} />
          )}
        </IconButton>
        <Text color="darkGray" style={{ marginTop: 8 }}>
          {likes}
        </Text>

        <IconButton>
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
