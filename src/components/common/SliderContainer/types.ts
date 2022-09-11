import theme from '~/styles/theme';

export type buttonType = 'normal' | 'circle';

export const buttonStyle: { [key in buttonType]: string } = {
  normal: `
  .slick-prev,
  .slick-next {
    background-image: url('/assets/icons/thinArrow.svg');
    background-size: 45px;

    &:hover {
      background-image: url('/assets/icons/thinArrow-active.svg');
    }
  }

  .slick-prev {
    left: -56px;
    transform: translate(0, -50%) rotate(180deg);
  }

  .slick-next {
    right: -56px;
  }
  `,
  circle: `
  .slick-prev,
  .slick-next {
    background-color: white;
    border-radius: 50%;
    border: 1px solid ${theme.color.borderDarkGray};
    box-shadow: ${theme.shadow.basicShadow};

    &:hover {
      background-color: #f7f8f9;
    }
  }

  .slick-next {
    background-image: url('/assets/icons/arrow-right.svg');
  }
  .slick-prev {
    background-image: url('/assets/icons/arrow-left.svg');
  }
  `
};
