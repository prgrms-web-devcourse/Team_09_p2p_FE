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
  key: 'userState',
  default: {
    accessToken: null,
    user: {
      id: null,
      nickname: null,
      profileImage: null
    }
  }
});
