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
