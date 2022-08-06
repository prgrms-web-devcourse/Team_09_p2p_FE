export interface User {
  id: string;
  nickname: string;
  gender: 'man' | 'woman';
}

export type SignupValues = {
  readonly email: string;
  readonly password: string;
  readonly passwordCheck: string;
  readonly nickname: string;
  readonly birth: string;
  readonly sex: 'male' | 'female';
};

export type LoginValues = {
  readonly email: string;
  readonly password: string;
};

export type Region =
  | '서울'
  | '인천'
  | '대구'
  | '대전'
  | '광주'
  | '부산'
  | '울산'
  | '경기'
  | '세종'
  | '강원'
  | '충북'
  | '충남'
  | '경북'
  | '경남'
  | '전북'
  | '전남'
  | '제주';

export type RegionAndAll = Region | '전체보기';

export type PlacePost = {
  id: number;
  name: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
  category: string;
  phoneNumber?: string;
  imageUrl?: string;
  liked: boolean;
  bookmarked: boolean;
  likeCount: number;
  usedCount: number;
};

export type Period = '당일' | '1~3일' | '4~7일' | '8~15일' | '15일 이상';
export type Theme =
  | '데이트 코스'
  | '힐링'
  | '드라이브'
  | '이쁜카페'
  | '맛집'
  | '가족여행'
  | '혼자여행';
export type Spot = '카페' | '음식점' | '숙소' | '산' | '바다' | '테마파크';

export interface SearchTagsValues {
  period: Period | null;
  theme: Theme[];
  spot: Spot[];
}

export interface SearchCourseValues extends SearchTagsValues {
  region: Region;
}
