import { atom } from 'recoil';

interface User {
  id: number | null;
  nickname: string | null;
  profileImage: string | null;
}
interface UserState {
  accessToken: string | null;
  user: User;
}

export const userState = atom<UserState>({
  key: 'LoginState',
  default: {
    accessToken: null,
    user: {
      id: 1,
      nickname: 'jinist',
      profileImage: null
    }
  }
});
