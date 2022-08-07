export const ObjectToQuery = (obj: any) => {
  // any type 수정 예정
  return `?${Object.entries(obj)
    .map((e) => e.join('='))
    .join('&')}`;
};

export function updateList<T>(list: T[], item: T): T[] {
  return [...list, item];
}

export function removeList<T>(list: T[], item: T): T[] {
  return list.filter((listItem) => listItem !== item);
}
