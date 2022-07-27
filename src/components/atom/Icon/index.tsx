import styled from '@emotion/styled';
import { ICON_URLS } from '~/utils/constants';

interface IconProps {
  name: string;
  size: number;
  rotate: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 15, rotate, ...props }) => {
  const { [name]: iconUrl } = ICON_URLS;

  const IconStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined
  };

  return (
    <IconWrapper style={IconStyle}>
      <img src={iconUrl} width={size} height={size} alt={name} />
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.i`
  display: inline-block;
`;
