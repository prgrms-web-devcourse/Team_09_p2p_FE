import { atom } from 'recoil';
import { UserState } from '~/types/user';
// 여기서 localstorage 불러와서 사용 안됨

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
