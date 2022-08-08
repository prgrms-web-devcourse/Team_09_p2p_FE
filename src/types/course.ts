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
  profileUrl: string;
}

export interface CourseFilter {
  placeId?: number;
  period?: string;
  keyword?: string;
  region?: string;
  spot?: string;
  theme?: string;
  sorting?: string;
  page?: number;
  size?: number;
}

export const sortOrder = {
  DESC: '최신순',
  POPULAR: '인기순'
} as const;

export type SortType = typeof sortOrder[keyof typeof sortOrder];

export type CourseSearchParams = {
  readonly placeId?: number;
  readonly keyword?: string;
  readonly period: Period | null;
  readonly region?: RegionAndAll | null;
  readonly spot?: Spot[];
  readonly theme?: Theme[];
  readonly page?: number;
  readonly size?: number;
  readonly sorting: SortType;
};
