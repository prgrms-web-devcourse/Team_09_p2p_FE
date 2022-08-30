import { Image } from '~/components/atom';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 100, height = 30 }: LogoProps) => {
  return <Image src="/assets/logo.png" alt="logo" width={width} height={height} />;
};

export default Logo;
