import { ErrorConfirm, UserRole, USER_ROLE } from './../types/user';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '~/recoil';
import { UserApi } from '~/service';
import { LoginValues } from '~/types';
import useToken from './useToken';

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
  const { setToken, removeToken } = useToken();

  const conFirmUserAuth = (authorities: UserRole[]) => {
    return authorities.includes(USER_ROLE.ADMIN) ? USER_ROLE.ADMIN : USER_ROLE.USER;
  };

  const login = async (data: LoginValues): Promise<ErrorConfirm> => {
    setCurrentUser({ ...currentUser });

    try {
      const response = await UserApi.login(data);
      setCurrentUser({
        accessToken: response.accessToken,
        user: {
          id: response.user.id,
          nickname: response.user.nickname,
          profileImage: response.user.profileImage,
          role: conFirmUserAuth(response.user.authorities)
        }
      });
      setToken(response.accessToken);

      return {
        isError: false,
        message: ''
      };
    } catch (error) {
      const e = error as SystemError;
      setCurrentUser({ ...currentUser });

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
    setCurrentUser({ ...currentUser });

    try {
      const response = await UserApi.getMyInfo();
      setCurrentUser({
        accessToken: token,
        user: {
          id: response.id,
          nickname: response.nickname,
          profileImage: response.profileImage,
          role: conFirmUserAuth(response.authorities)
        }
      });
    } catch (e) {
      removeToken();
      setCurrentUser({
        accessToken: null,
        user: {
          id: null,
          nickname: null,
          profileImage: null,
          role: null
        }
      });
    }
  };

  const updateProfile = async (profileImage: string) => {
    setCurrentUser({
      ...currentUser,
      user: { ...currentUser.user, profileImage }
    });
  };

  const logout = async () => {
    removeToken();
    resetUser();
  };

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
    updateUser,
    updateProfile
  };
};
