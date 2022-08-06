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
