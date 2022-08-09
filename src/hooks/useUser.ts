import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '~/recoil';
import { UserApi } from '~/service';
import WebStorage from '~/service/core/WebStorage';
import { LoginValues } from '~/types';

export const useUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const isLoggedIn = currentUser.accessToken !== null;

  const login = async (data: LoginValues) => {
    setCurrentUser({ ...currentUser, isLoading: true });
    const response = await UserApi.login(data);
    setCurrentUser({ ...response, isLoading: false });
    WebStorage.setToken(response.accessToken);
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
