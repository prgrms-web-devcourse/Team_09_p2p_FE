import { Region } from '.';
import { SortType } from './course';

export interface IPlaceItem {
  id: number;
  title: string;
  likeCount: number;
  usedCount: number;
  category: string;
  thumbnail: string;
  bookmarked: boolean;
}

export interface IPlace {
  id: number;
  placeId: number;
  name: string;
  description: string;
  address: string;
  roadAddress: string;
  latitude: string;
  longitude: string;
  category: string;
  phoneNumber: string;
  imageUrl: string;
  isRecommended: boolean;
  isThumbnail: boolean;
}

export interface PlaceFilter {
  keyword?: string;
  page?: number;
  size?: number;
  sorting?: SortType;
}

export interface PlaceSearchParams {
  keyword?: string;
  region?: Region;
  page: number;
  size: number;
  sorting: '최신순' | '인기순';
}

export interface IPlaceForm {
  id: number;
  kakaoMapId: number;
  name: string;
  description: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
  category: string;
  phoneNumber: string;
  isRecommended: boolean;
  isThumbnail: boolean;
  imageUrl: string;
}
