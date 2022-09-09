import SliderContainer from '~/components/common/SliderContainer';
import ImageViewer from '~/components/common/ImageViewer';

interface PlaceSliderProps {
  images: string[];
  name: string;
}

const PlaceSlider = ({ images, name }: PlaceSliderProps) => {
  return (
    <SliderContainer show={1} dots>
      {images.map((image, index) => (
        <ImageViewer key={image} src={image} alt={`${name} 이미지 ${index}`} />
      ))}
    </SliderContainer>
  );
};

export default PlaceSlider;
