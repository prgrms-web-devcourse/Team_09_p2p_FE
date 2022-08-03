import styled from '@emotion/styled';
import Image from 'next/image';
import { ICON_URLS } from '~/utils/constants';

interface IconProps {
  name: string;
  size?: number;
  rotate?: number;
  block?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, size = 15, rotate, block, ...props }) => {
  const { [name]: iconUrl } = ICON_URLS;

  const IconStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    display: block ? 'block' : 'inline-block'
  };

  return (
    <IconWrapper style={IconStyle} block={block} {...props}>
      <Image src={iconUrl} width={size} height={size} alt={name} />
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.i<Pick<IconProps, 'block'>>`
  span {
    display: block !important;
  }
`;
