import { IPlace, IPlaceForm } from './place';
import { Period, RegionAndAll, Spot, Theme } from '.';

export interface ICourseItem {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  themes: string[];
  places: string[];
  likes: number;
  isBookmarked: boolean;
  nickname: string;
  profileImage: string;
}

export interface ICourseDetail {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  themes: string[];
  spots: string[];
  places: IPlace[];
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  nickname: string;
  userId: number;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
}

export interface CourseFilter {
  placeId?: number;
  period?: string;
  keyword?: string;
  region?: string;
  spots?: string;
  themes?: string;
  sorting?: string;
  page?: number;
  size?: number;
}

export interface ICourseForm {
  id: number;
  title: string;
  region: string;
  period: string;
  description: string;
  themes: string[];
  spots: string[];
  places: IPlaceForm[];
}

export const sortOrder = {
  DESC: '최신순',
  POPULAR: '인기순'
} as const;

export type SortType = typeof sortOrder[keyof typeof sortOrder];

export type CourseSearchParams = {
  readonly placeId?: number;
  readonly keyword?: string;
  readonly period?: Period | null;
  readonly region?: RegionAndAll | null;
  readonly spots?: Spot[];
  readonly themes?: Theme[];
  readonly page?: number;
  readonly size?: number;
  readonly sorting: SortType;
};
