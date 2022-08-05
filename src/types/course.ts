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
  spot?: string[];
  theme?: string[];
  sorting?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const sortOrder = {
  CREATED_AT: 'createdAt',
  DESC: 'desc'
} as const;

export type SortType = typeof sortOrder[keyof typeof sortOrder];
