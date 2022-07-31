import theme from '~/styles/theme';

const { fontGray, fontDarkGray, fontDarkBlack } = theme.color;

export const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24
};

export const TITLE_SIZES = {
  sm: 24,
  md: 32,
  lg: 40
};

export const FONT_COLORS: { [key: string]: string } = {
  gray: fontGray,
  darkGray: fontDarkGray,
  dark: fontDarkBlack
};

export const ICON_URLS: { [key: string]: string } = {
  heart: '/assets/icons/heart.svg',
  bookmark: '/assets/icons/bookmark.svg',
  arrow: '/assets/icons/arrow.svg',
  calendar: '/assets/icons/calendar.svg',
  marker: '/assets/icons/marker.svg',
  route: '/assets/icons/route.svg'
};
