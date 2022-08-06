export const ObjectToQuery = (obj: any) => {
  // any type 수정 예정
  return `?${Object.entries(obj)
    .map((e) => e.join('='))
    .join('&')}`;
};
