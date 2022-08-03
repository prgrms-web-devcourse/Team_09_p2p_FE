import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface PlusIconProps {
  onClick?: () => void;
}

const PlusIcon = ({ onClick }: PlusIconProps) => {
  return <StyledIcon name="plus" size={12} />;
};

export default PlusIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
