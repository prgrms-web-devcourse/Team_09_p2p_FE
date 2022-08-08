export const ObjectToQuery = (obj: any) => {
  // any type 수정 예정
  return `?${Object.entries(obj)
    .map((e) => e.join('='))
    .join('&')}`;
};

export const sliceDate = (data: string) => {
  return data.substring(0, 10);
};

export const isNumber = (num: string | number) => {
  return !Number.isNaN(Number(num));
};
