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
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  imageUrl: string;
  isRecommended: boolean;
  isThumbnail: boolean;
}

export interface PlaceFilter {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: SortType;
}

export interface PlaceSearchParams {
  keyword?: string;
  region?: Region;
  page: number;
  size: number;
  sorting: '최신순' | '인기순';
}
