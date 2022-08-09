import styled from '@emotion/styled';
import IconButton from '~/components/atom/Icon/IconButton';

interface PlusIconProps {
  onClick?: () => void;
}

const PlusIcon = ({ onClick }: PlusIconProps) => {
  return <StyledIcon onClick={onClick as () => void} name="plus" size={12} />;
};

export default PlusIcon;

const StyledIcon = styled(IconButton)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
