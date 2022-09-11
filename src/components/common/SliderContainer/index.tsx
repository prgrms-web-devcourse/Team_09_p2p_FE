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
  show?: number;
  itemMargin?: number;
}

const SliderContainer = ({
  children,
  dots,
  button = 'normal',
  show = 3,
  itemMargin = 0
}: SliderContainerProps) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: show,
    slidesToScroll: show,
    dots: dots
  };
  return (
    <StyledSlider {...settings} button={button} itemMargin={itemMargin}>
      {children}
    </StyledSlider>
  );
};

export default SliderContainer;

const StyledSlider = styled(Slider)<SliderContainerProps>`
  margin-top: 24px;
  margin-bottom: ${({ dots }) => dots && `${40}px`};

  ${({ button }) => button && buttonStyle[button]}

  .slick-list {
    margin-left: ${({ itemMargin }) => itemMargin && `${-itemMargin}px`};
    margin-right: ${({ itemMargin }) => itemMargin && `${-itemMargin}px`};
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
    position: absolute;
    bottom: -36px;
    li {
      margin: 0 2px;
    }
  }
`;
