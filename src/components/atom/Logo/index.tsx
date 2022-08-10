import styled from '@emotion/styled';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 100, height = 30 }: LogoProps) => {
  return (
    <ImageWrapper width={width} height={height}>
      <Image src="/assets/logo.png" alt="logo" layout="fill" objectFit="contain" />
    </ImageWrapper>
  );
};

export default Logo;

const ImageWrapper = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
