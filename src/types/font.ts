import theme from '~/styles/theme';

const { fontGray, fontDarkGray, fontDarkBlack, fontBlueGray } = theme.color;

export const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24
};

export type FontSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const TITLE_SIZES = {
  sm: 24,
  md: 32,
  lg: 40
};

export type TitleSizes = 'sm' | 'md' | 'lg';

export const FONT_COLORS: { [key: string]: string } = {
  gray: fontGray,
  darkGray: fontDarkGray,
  dark: fontDarkBlack,
  blueGray: fontBlueGray
};

export type FontColors = 'gray' | 'darkGray' | 'dark' | 'blueGray';
