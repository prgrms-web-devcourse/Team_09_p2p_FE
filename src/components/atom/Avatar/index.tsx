import styled from '@emotion/styled';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  size: number;
}

const defaultImage = '/assets/location/jeju.jpg';

const Avatar: React.FC<AvatarProps> = ({ src = defaultImage, size }) => {
  return (
    <ImageWrapper style={{ width: size, height: size }}>
      <Image src={src} layout="fill" alt="profile" />
    </ImageWrapper>
  );
};

export default Avatar;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
