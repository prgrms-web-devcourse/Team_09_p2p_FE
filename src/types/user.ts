export interface User {
  id: number | null;
  nickname: string | null;
  profileImage: string | null;
  role: UserRole | null;
}

export const USER_ROLE = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
export interface UserState {
  accessToken: string | null;
  user: User;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  birth: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserEdit {
  nickname: string;
  birth: string;
  sex: 'male' | 'female';
}

export interface UserPasswordFormValues {
  oldPassword: string;
  password: string;
  passwordCheck: string;
}

export interface ErrorConfirm {
  isError: boolean;
  message: string;
}
