import styled from '@emotion/styled';
import { Image } from '~/components/atom';

interface ImageViewerProps {
  src?: string;
  alt: string;
}

const ImageViewer = ({ src, alt }: ImageViewerProps) => {
  return <Wrapper>{src && <Image src={src} alt={alt} height="100%" cover />}</Wrapper>;
};

export default ImageViewer;

const Wrapper = styled.div`
  height: 500px;
  background-color: #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;
