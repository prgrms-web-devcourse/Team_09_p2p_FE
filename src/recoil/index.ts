import { atom } from 'recoil';
import { UserState } from '~/types/user';

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    accessToken: null,
    user: {
      id: null,
      nickname: null,
      profileImage: null,
      role: null
    }
  }
});
