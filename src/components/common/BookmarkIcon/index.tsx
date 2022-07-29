import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface BookmarkIconProps {
  onClick?: () => void; // 필수로 변경할 예정
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ onClick }) => {
  // TODO: 클릭 시 데이터에 따라 toggle 구현하기
  return <StyledIcon name="bookmark" size={40} />;
};

export default BookmarkIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 14px;
  right: 14px;
`;
