import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface CloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: CloseIconProps) => {
  return <StyledIcon name="close" size={12} />;
};

export default CloseIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
