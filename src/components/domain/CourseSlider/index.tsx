import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import theme from '~/styles/theme';
import CourseSliderItem from './CourseSliderItem';
import { IPlace } from '~/types/place';

interface CourseSliderProps {
  places?: IPlace[];
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
    <StyledSlider {...settings}>
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

const { borderDarkGray } = theme.color;
const { basicShadow } = theme.shadow;

export const StyledSlider = styled(Slider)`
  margin-top: 24px;

  .slick-list {
    margin-left: -10px;
    margin-right: -10px;
  }

  .slick-prev,
  .slick-next {
    background-color: white;
    border-radius: 50%;
    border: 1px solid ${borderDarkGray};
    width: 50px;
    height: 50px;
    z-index: 100;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: ${basicShadow};
    transition: all 0.1s;

    &:hover {
      background-color: #f7f8f9;
    }

    &.slick-disabled {
      display: none !important;
    }
  }

  .slick-next {
    background-image: url('/assets/icons/arrow-right.svg');
  }
  .slick-prev {
    background-image: url('/assets/icons/arrow-left.svg');
  }

  .slick-next:before,
  .slick-prev:before {
    content: '';
  }

  .slick-dots {
    position: static;
    margin-top: 20px;
  }
`;
