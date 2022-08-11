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

const { borderDarkGray } = theme.color;

const StyledSlider = styled(Slider)`
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
    background-image: url('/assets/icons/arrow.svg');
    background-repeat: no-repeat;
    background-position: center;

    &.slick-disabled {
      display: none !important;
    }
  }

  .slick-prev {
    transform: translate(0, -50%) rotate(180deg);
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
