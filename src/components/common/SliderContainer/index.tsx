import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Slider from 'react-slick';
import theme from '~/styles/theme';

interface SliderContainerProps {
  children: ReactNode;
  dots?: boolean;
}

const SliderContainer = ({ children, dots }: SliderContainerProps) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: dots
  };
  return <StyledSlider {...settings}>{children}</StyledSlider>;
};

export default SliderContainer;

const StyledSlider = styled(Slider)`
  margin-top: 24px;
  height: 360px;

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
    background-image: url('/assets/icons/thinArrow.svg');
    background-size: 45px;
    background-repeat: no-repeat;
    background-position: center;

    &.slick-disabled {
      display: none !important;
    }
    &:hover {
      background-image: url('/assets/icons/thinArrow-active.svg');
    }
  }

  .slick-prev {
    left: -56px;
    transform: translate(0, -50%) rotate(180deg);
  }

  .slick-next:before,
  .slick-prev:before {
    content: '';
  }

  .slick-next {
    right: -56px;
  }

  .slick-dots {
    position: static;
    margin-top: 20px;
  }
`;
