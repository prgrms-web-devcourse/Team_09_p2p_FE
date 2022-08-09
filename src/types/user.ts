export interface User {
  id: number | null;
  nickname: string | null;
  profileImage: string | null;
}

export interface UserState {
  accessToken: string | null;
  user: User;
  isLoading: boolean;
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

export interface UserPasswordFormValues {
  oldPassword: string;
  password: string;
  passwordCheck: string;
}
