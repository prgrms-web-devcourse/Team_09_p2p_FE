import Api from '~/service/core/Api';
import { LoginValues, SignupValues } from '~/types';
import { UserEdit } from '~/types/user';

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  birth: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
}
class UserApi extends Api {
  private path = '/users';

  login = async (bodyData: LoginValues) => {
    try {
      const response = await this.baseInstance.post(`${this.path}/login`, bodyData);
      return response.data;
    } catch (e) {
      console.error(`로그인 에러: `, e);
    }
  };

  signup = async (bodyData: SignupValues) => {
    try {
      const response = await this.baseInstance.post(`${this.path}/`, bodyData);
      return response.data;
    } catch (e) {
      console.error(`회원가입 에러:`, e);
    }
  };

  emailCheck = async (bodyData: { email: string }) => {
    const response = await this.baseInstance.post(`${this.path}/email`, bodyData);
    return response;
  };

  nicknameCheck = async (bodyData: { nickname: string }) => {
    const response = await this.baseInstance.post(`${this.path}/nickname`, bodyData);
    return response;
  };

  getUser = async () => {
    const response = await this.authInstance.get(`${this.path}`);
    return response.data;
  };

  edit = async (bodyData: UserEdit) => {
    const response = await this.authInstance.put(`${this.path}`, bodyData);
    return response;
  };
}

export default new UserApi();
