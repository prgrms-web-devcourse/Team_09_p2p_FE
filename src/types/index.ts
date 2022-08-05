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

export type Region = {
  text: string;
};

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
