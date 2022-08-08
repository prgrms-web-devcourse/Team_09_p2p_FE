import styled from '@emotion/styled';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

interface ImageProps {
  width?: number | string;
  height?: number | string;
  cover?: boolean;
}

const Image = ({ width = '100%', height, cover, ...props }: ImageProps & NextImageProps) => {
  return (
    <ImageWrapper width={width} height={height}>
      <NextImage layout="fill" objectFit={cover ? 'cover' : 'contain'} {...props} />
    </ImageWrapper>
  );
};

export default Image;

const ImageWrapper = styled.div<ImageProps>`
  width: ${({ width }) => (typeof width === 'number' ? width + 'px' : width)};
  height: ${({ height }) => (typeof height === 'number' ? height + 'px' : height)};
  & > span {
    position: unset !important;
    height: ${({ height }) => (typeof height === 'number' ? height + 'px' : height)} !important;
    & img {
      position: relative !important;
      height: auto !important;
    }
  }
`;
