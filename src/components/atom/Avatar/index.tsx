import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import theme from '~/styles/theme';
import { USER_DEFAULT_IMAGE } from '~/utils/constants/images';
import Image from '../Image';

interface AvatarProps {
  src?: string | null;
  size?: number;
  style?: CSSProperties;
}

const Avatar = ({ src, size = 55, ...props }: AvatarProps) => {
  const imageUrl = src || USER_DEFAULT_IMAGE;
  return (
    <ImageWrapper {...props} style={{ width: size, height: size }}>
      <Image src={imageUrl} width={size} height={size} alt="profile" cover />
    </ImageWrapper>
  );
};

export default Avatar;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 1px solid ${theme.color.borderGray};
`;
