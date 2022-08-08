import styled from '@emotion/styled';
import { MouseEvent } from 'react';
import { Icon } from '~/components/atom';

interface BookmarkIconProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  bookmarked: boolean;
}

const BookmarkIcon = ({ onClick, bookmarked }: BookmarkIconProps) => {
  return (
    <StyledIcon
      name={bookmarked ? 'bookmarkThumbActive' : 'bookmarkThumb'}
      size={40}
      onClick={onClick}
    />
  );
};

export default BookmarkIcon;

const StyledIcon = styled(Icon.Button)`
  position: absolute;
  top: 14px;
  right: 14px;
`;
