import styled from '@emotion/styled';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  size?: number;
}

const defaultImage = '/assets/profile-default.jpg';

const Avatar: React.FC<AvatarProps> = ({ src, size = 66 }) => {
  const imageUrl = src || defaultImage;
  return (
    <ImageWrapper style={{ width: size, height: size }}>
      <Image src={imageUrl} layout="fill" alt="profile" />
    </ImageWrapper>
  );
};

export default Avatar;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
