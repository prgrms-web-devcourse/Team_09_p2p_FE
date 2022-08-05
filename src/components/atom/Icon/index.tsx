import styled from '@emotion/styled';
import Image from 'next/image';
import IconButton from './IconButton';
import { ICON_URLS, IconName } from './types';

export interface IconProps {
  name: IconName;
  size?: number;
  rotate?: number;
  block?: boolean;
}

const Icon = ({ name, size = 15, rotate, block, ...props }: IconProps) => {
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

Icon.Button = IconButton;

export default Icon;

const IconWrapper = styled.i<Pick<IconProps, 'block'>>`
  span {
    display: block !important;
  }
`;
