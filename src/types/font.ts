import theme from '~/styles/theme';

const {
  mainColor,
  fontGray,
  fontDarkGray,
  fontDarkBlack,
  fontBlueGray,
  fontRed,
  fontLightGray,
  recommendColor
} = theme.color;

export const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24
};

export type FontSizes = keyof typeof FONT_SIZES;

export const TITLE_SIZES = {
  sm: 24,
  md: 32,
  lg: 40
};

export type TitleSizes = keyof typeof TITLE_SIZES;

export const FONT_COLORS = {
  gray: fontGray,
  lightGray: fontLightGray,
  darkGray: fontDarkGray,
  dark: fontDarkBlack,
  blueGray: fontBlueGray,
  main: mainColor,
  red: fontRed,
  recommend: recommendColor
};

export type FontColors = keyof typeof FONT_COLORS;
