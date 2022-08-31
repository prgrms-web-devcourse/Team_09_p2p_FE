import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Slider from 'react-slick';
import { buttonStyle, buttonType } from './types';

interface SliderContainerProps {
  children: ReactNode;
  dots?: boolean;
  button?: buttonType;
}

const SliderContainer = ({ children, dots, button = 'normal' }: SliderContainerProps) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: dots
  };
  return (
    <StyledSlider {...settings} button={button}>
      {children}
    </StyledSlider>
  );
};

export default SliderContainer;

const StyledSlider = styled(Slider)<SliderContainerProps>`
  margin-top: 24px;

  ${({ button }) => button && buttonStyle[button]}

  .slick-list {
    margin-left: -10px;
    margin-right: -10px;
  }

  .slick-track {
    margin: 0;
  }

  .slick-prev,
  .slick-next {
    width: 50px;
    height: 50px;
    z-index: 100;
    background-repeat: no-repeat;
    background-position: center;

    &.slick-disabled {
      display: none !important;
    }
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
