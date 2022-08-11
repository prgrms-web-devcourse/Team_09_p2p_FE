import { Period, RegionAndAll, Spot, Theme } from '~/types';
import { CourseSearchParams } from '~/types/course';
import { REGIONS, TAGS_PERIOD, TAGS_SPOT, TAGS_THEME } from './constants';

export const ObjectToQuery = (obj: any) => {
  // any type 수정 예정
  return `?${Object.entries(obj)
    .map((e) => e.join('='))
    .join('&')}`;
};

export const sliceDate = (data: string) => {
  return data.substring(0, 10);
};

export const textEllipsis = (value: string, length: number) => {
  if (value.length < length) {
    return value;
  }

  return value.substring(0, length) + '...';
};

export function updateList<T>(list: T[], item: T): T[] {
  return [...list, item];
}

export function removeList<T>(list: T[], item: T): T[] {
  return list.filter((listItem) => listItem !== item);
}

export const makeQueryString = (params: CourseSearchParams): string => {
  return Object.entries(params).reduce((queryString, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      return queryString + `&${key}=${value.join(',')}`;
    }
    if (value) {
      return queryString + `&${key}=${value}`;
    }
    return queryString;
  }, '?');
};

export const isNumber = (num: string | number) => {
  return !Number.isNaN(Number(num));
};

// search converters

const compareStringToList = (
  unknownString: string,
  comparedList: string[]
): string[] | undefined => {
  const unknownList = unknownString.split(',');
  if (unknownList.length === 0) {
    return undefined;
  }

  for (const string of unknownList) {
    if (!comparedList.find((correctString) => correctString === string)) {
      return undefined;
    }
  }
  return unknownList;
};

export const correctedPeriod = (period: string): Period | undefined => {
  return TAGS_PERIOD.find((correctPeriod) => correctPeriod === period);
};

export const correctedRegion = (region: string): RegionAndAll | undefined => {
  return (['전체보기', ...REGIONS] as RegionAndAll[]).find(
    (correctRegion) => correctRegion === region
  );
};

export const correctedThemes = (theme: string): Theme[] | undefined => {
  return compareStringToList(theme, TAGS_THEME) as Theme[] | undefined;
};

export const correctedSpots = (spot: string): Spot[] | undefined => {
  return compareStringToList(spot, TAGS_SPOT) as Spot[] | undefined;
};
