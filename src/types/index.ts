export interface User {
  id: string;
  nickname: string;
  gender: 'man' | 'woman';
}

export type LoginValues = {
  readonly email: string;
  readonly password: string;
};
