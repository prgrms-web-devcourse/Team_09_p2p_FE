import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface CloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: CloseIconProps) => {
  return <StyledIcon onClick={onClick as () => void} name="thinClose" size={50} />;
};

export default CloseIcon;

const StyledIcon = styled(Icon.Button)`
  position: absolute;
  top: 30px;
  right: 30px;
`;
