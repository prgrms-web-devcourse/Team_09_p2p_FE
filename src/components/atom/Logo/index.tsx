import { Image } from '~/components/atom';
import { IMAGE_URL } from '~/utils/constants/images';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 100, height = 30 }: LogoProps) => {
  return <Image src={`${IMAGE_URL}/assets/logo.png`} alt="logo" width={width} height={height} />;
};

export default Logo;
