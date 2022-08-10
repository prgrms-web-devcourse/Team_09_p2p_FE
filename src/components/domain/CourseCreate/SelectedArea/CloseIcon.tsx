import styled from '@emotion/styled';
import IconButton from '~/components/atom/Icon/IconButton';
//import { IconButton } from '~/components/atom/Icon';

interface CloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: CloseIconProps) => {
  return <StyledIcon onClick={onClick as () => void} name="close" size={12} />;
};

export default CloseIcon;

const StyledIcon = styled(IconButton)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
