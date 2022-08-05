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
