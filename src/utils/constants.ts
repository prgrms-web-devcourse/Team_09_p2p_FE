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
  search: '/assets/icons/search.svg',
  close: '/assets/icons/close.svg',
  plus: '/assets/icons/plus.svg'
};

export const MARKER_IMAGE_URLS: { [key: string]: string } = {
  academy: '/assets/place/academy.png',
  agency: '/assets/place/agency.png',
  bank: '/assets/place/bank.png',
  convenience: '/assets/place/convenience.png',
  culturalFacility: '/assets/place/culturalFacility.png',
  defaultPlace: '/assets/place/defaultPlace.png',
  gasStation: '/assets/place/gasStation.png',
  kindergarden: '/assets/place/kindergarden.png',
  parking: '/assets/place/parking.png',
  publicInstitutions: '/assets/place/publicInstitutions.png',
  school: '/assets/place/school.png',
  shopping: '/assets/place/shopping.png',
  subway: '/assets/place/subway.png',
  attractions: '/assets/place/attractions.png',
  accommodation: '/assets/place/accommodation.png',
  restaurant: '/assets/place/restaurant.png',
  cafe: '/assets/place/cafe.png',
  hospital: '/assets/place/hospital.png',
  pharmacy: '/assets/place/pharmacy.png'
};
