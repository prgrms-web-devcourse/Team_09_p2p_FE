import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import theme from '~/styles/theme';
import CourseSliderItem from './CourseSliderItem';
import { IPlace } from '~/pages/course/detail';

interface CourseSliderProps {
  places: IPlace[];
}

const CourseSlider = ({ places }: CourseSliderProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {places?.map((place) => (
          <CourseSliderItem key={place.id} name={place.name} id={place.id} />
        ))}
      </StyledSlider>
    </div>
  );
};

export default CourseSlider;

const { borderDarkGray } = theme.color;
export const StyledSlider = styled(Slider)`
  .card-item {
    margin-left: 20px;
  }

  .slick-list {
    margin-left: -20px;
  }

  .slick-prev,
  .slick-next {
    background-color: white;
    border-radius: 50%;
    border: 1px solid ${borderDarkGray};
    width: 55px;
    height: 55px;
    z-index: 100;
    background-image: url('/assets/icons/arrow.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
  .slick-prev {
    transform: translate(0, -50%) rotate(180deg);
  }

  .slick-next:before,
  .slick-prev:before {
    content: '';
  }

  .slick-dots {
    bottom: -40px;
  }
`;
