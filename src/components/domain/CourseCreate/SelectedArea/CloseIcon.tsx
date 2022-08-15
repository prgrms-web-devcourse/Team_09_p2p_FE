import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface CloseIconProps {
  onClick?: () => void;
  size?: number;
}

const CloseIcon = ({ onClick, size = 50 }: CloseIconProps) => {
  return <StyledIcon onClick={onClick as () => void} name="thinClose" size={size} />;
};

export default CloseIcon;

const StyledIcon = styled(Icon.Button)`
  position: absolute;
  top: 30px;
  right: 30px;
`;
