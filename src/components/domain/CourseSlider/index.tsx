import styled from '@emotion/styled';
import CourseSliderItem from './CourseSliderItem';
import { IPlace } from '~/types/place';
import SliderContainer from '~/components/common/SliderContainer';

interface CourseSliderProps {
  places?: IPlace[];
}

const CourseSlider = ({ places }: CourseSliderProps) => {
  return (
    <StyledSlider button="circle" itemMargin={10} dots>
      {places?.map((place, index) => (
        <CourseSliderItem
          key={place.id}
          name={place.name}
          placeId={place.placeId}
          index={index}
          lastCount={places.length}
          imageUrl={place.imageUrl}
        />
      ))}
    </StyledSlider>
  );
};

export default CourseSlider;

export const StyledSlider = styled(SliderContainer)`
  .slick-prev,
  .slick-next {
    top: calc(50% + 33px);
  }
`;
