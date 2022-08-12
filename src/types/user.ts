export interface User {
  id: number | null;
  nickname: string | null;
  profileImage: string | null;
}

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
