import { CourseSearchParams } from '~/types/course';

export const ObjectToQuery = (obj: any) => {
  // any type 수정 예정
  return `?${Object.entries(obj)
    .map((e) => e.join('='))
    .join('&')}`;
};

export const sliceDate = (data: string) => {
  return data.substring(0, 10);
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
