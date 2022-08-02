import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface CloseIconProps {
  onClick?: () => void; // 필수로 변경할 예정
}

const CloseIcon = ({ onClick }: CloseIconProps) => {
  // todo: 전달받은 onClick 핸들러에서 장소 제거 기능 구현
  return <StyledIcon name="close" size={12} />;
};

export default CloseIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
