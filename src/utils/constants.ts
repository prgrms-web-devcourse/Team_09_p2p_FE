import theme from '~/styles/theme';
import { Period, Region, Spot, Theme } from '~/types';

const { fontGray, fontDarkGray, fontDarkBlack } = theme.color;
export const IMAGE_URL = 'https://devcourse-f-s3-storage.s3.ap-northeast-2.amazonaws.com';

export const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24
};

export const TITLE_SIZES = {
  sm: 24,
  md: 28,
  lg: 36
};

export const FONT_COLORS: { [key: string]: string } = {
  gray: fontGray,
  darkGray: fontDarkGray,
  dark: fontDarkBlack
};

export const MARKER_IMAGE_URLS: { [key: string]: string } = {
  academy: `${IMAGE_URL}/assets/place/academy.png`,
  agency: `${IMAGE_URL}/assets/place/agency.png`,
  bank: `${IMAGE_URL}/assets/place/bank.png`,
  convenience: `${IMAGE_URL}/assets/place/convenience.png`,
  culturalFacility: `${IMAGE_URL}/assets/place/culturalFacility.png`,
  defaultPlace: `${IMAGE_URL}/assets/place/defaultPlace.png`,
  gasStation: `${IMAGE_URL}/assets/place/gasStation.png`,
  kindergarden: `${IMAGE_URL}/assets/place/kindergarden.png`,
  parking: `${IMAGE_URL}/assets/place/parking.png`,
  publicInstitutions: `${IMAGE_URL}/assets/place/publicInstitutions.png`,
  school: `${IMAGE_URL}/assets/place/school.png`,
  shopping: `${IMAGE_URL}/assets/place/shopping.png`,
  subway: `${IMAGE_URL}/assets/place/subway.png`,
  attractions: `${IMAGE_URL}/assets/place/attractions.png`,
  accommodation: `${IMAGE_URL}/assets/place/accommodation.png`,
  restaurant: `${IMAGE_URL}/assets/place/restaurant.png`,
  cafe: `${IMAGE_URL}/assets/place/cafe.png`,
  hospital: `${IMAGE_URL}/assets/place/hospital.png`,
  pharmacy: `${IMAGE_URL}/assets/place/pharmacy.png`,
  placeNumberSprite: `${IMAGE_URL}/assets/place/_place-number-sprite.png`
};

export const TAGS_PERIOD: Period[] = ['당일', '1~3일', '4~7일', '8~15일', '15일이상'];
export const TAGS_THEME: Theme[] = [
  '데이트코스',
  '힐링',
  '드라이브',
  '이쁜카페',
  '맛집',
  '가족여행',
  '혼자여행'
];
export const TAGS_SPOT: Spot[] = ['카페', '음식점', '숙소', '산', '바다', '테마파크'];

export const REGIONS: Region[] = [
  '서울',
  '인천',
  '대구',
  '대전',
  '광주',
  '부산',
  '울산',
  '경기',
  '세종',
  '강원',
  '충북',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
  '제주'
];

export const REGION_BOUNDARY: {
  [key: string]: { sw: { lat: number; lng: number }; ne: { lat: number; lng: number } };
} = {
  서울: { sw: { lat: 37.4403095, lng: 126.784 }, ne: { lat: 37.6799006, lng: 127.173909 } },
  인천: { sw: { lat: 37.0222068, lng: 124.6383 }, ne: { lat: 37.9741764, lng: 126.7853 } },
  대구: { sw: { lat: 35.6182382, lng: 128.3637 }, ne: { lat: 35.9975, lng: 128.753 } },
  대전: { sw: { lat: 36.2033513, lng: 127.2574 }, ne: { lat: 36.4925763, lng: 127.530175 } },
  광주: { sw: { lat: 35.0562, lng: 126.6603 }, ne: { lat: 35.2512917, lng: 127.006 } },
  부산: { sw: { lat: 35.0111833, lng: 128.8216461 }, ne: { lat: 35.3756, lng: 129.2841375 } },
  울산: { sw: { lat: 35.3495, lng: 129.0087625 }, ne: { lat: 35.7081, lng: 129.4518 } },
  경기: { sw: { lat: 36.9126821, lng: 126.3870629 }, ne: { lat: 38.2071, lng: 127.792525 } },
  세종: { sw: { lat: 36.4187428, lng: 127.146765 }, ne: { lat: 36.722325, lng: 127.397376 } },
  강원: { sw: { lat: 37.07665, lng: 127.1428375 }, ne: { lat: 38.581674, lng: 129.3415 } },
  충북: { sw: { lat: 36.0208459, lng: 127.2889997 }, ne: { lat: 37.2280796, lng: 128.6153739 } },
  충남: { sw: { lat: 35.9974, lng: 126.0615 }, ne: { lat: 37.0379, lng: 127.6148 } },
  경북: { sw: { lat: 35.5715, lng: 127.817 }, ne: { lat: 37.54075, lng: 131.8702806 } },
  경남: { sw: { lat: 34.5644509, lng: 127.6045 }, ne: { lat: 35.8887, lng: 129.1956 } },
  전북: { sw: { lat: 35.3094, lng: 125.9803445 }, ne: { lat: 36.1462085, lng: 127.88485 } },
  전남: { sw: { lat: 33.9788, lng: 125.1128495 }, ne: { lat: 35.4541, lng: 127.8124 } },
  제주: { sw: { lat: 33.1696799, lng: 126.1798 }, ne: { lat: 34.00952, lng: 126.9549 } }
};
