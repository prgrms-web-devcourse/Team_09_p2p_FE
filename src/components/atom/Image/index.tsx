import styled from '@emotion/styled';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends NextImageProps {
  width?: number | string;
}

const Image: React.FC<ImageProps> = ({ width = '100%', ...props }) => {
  return (
    <ImageWrapper width={width}>
      <NextImage layout="fill" objectFit="contain" {...props} />
    </ImageWrapper>
  );
};

export default Image;

const ImageWrapper = styled.div<Pick<ImageProps, 'width'>>`
  width: ${({ width }) => (typeof width === 'number' ? width + 'px' : width)};
  & > span {
    position: unset !important;
    & img {
      position: relative !important;
      height: auto !important;
    }
  }
`;
