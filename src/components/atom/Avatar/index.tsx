import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import theme from '~/styles/theme';
import Image from '../Image';

interface AvatarProps {
  src?: string | null;
  size?: number;
  style?: CSSProperties;
}

const defaultImage = '/assets/profile-default.jpg';

const Avatar: React.FC<AvatarProps> = ({ src, size = 66, ...props }) => {
  const imageUrl = src || defaultImage;
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
