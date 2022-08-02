import styled from '@emotion/styled';
import { Icon } from '~/components/atom';

interface PlusIconProps {
  onClick?: () => void; // 필수로 변경할 예정
}

const PlusIcon = ({ onClick }: PlusIconProps) => {
  // todo: 전달받은 onClick 핸들러에서 장소 추가 기능 구현
  return <StyledIcon name="plus" size={12} />;
};

export default PlusIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 25px;
  right: 31px;
`;
