import { ErrorConfirm } from './../types/user';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '~/recoil';
import { UserApi } from '~/service';
import WebStorage from '~/service/core/WebStorage';
import { LoginValues } from '~/types';

interface SystemError {
  code: string;
  message: string;
  response: {
    status: number;
  };
}

export const useUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const isLoggedIn = currentUser.accessToken !== null;

  const login = async (data: LoginValues): Promise<ErrorConfirm> => {
    setCurrentUser({ ...currentUser, isLoading: true });

    try {
      const response = await UserApi.login(data);
      setCurrentUser({ ...response, isLoading: false });
      WebStorage.setToken(response.accessToken);

      return {
        isError: false,
        message: ''
      };
    } catch (error) {
      const e = error as SystemError;
      setCurrentUser({ ...currentUser, isLoading: false });

      let message = '';

      if (e.response.status === 401) {
        message = '비밀번호가 일치하지 않습니다.';
      }

      if (e.response.status === 404) {
        message = '아이디 비밀번호를 다시 입력해주세요.';
      }

      return {
        isError: true,
        message
      };
    }
  };

  const updateUser = async (token: string) => {
    setCurrentUser({ ...currentUser, isLoading: true });

    const response = await UserApi.getMyInfo();
    console.log(response, '★update User★');
    setCurrentUser({
      accessToken: token,
      user: {
        id: response.id,
        nickname: response.nickname,
        profileImage: response.profileImage
      },
      isLoading: false
    });
  };

  const logout = async () => {
    WebStorage.removeToken();
    resetUser();
  };

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
    updateUser
  };
};
