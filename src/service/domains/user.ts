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
    const response = await this.baseInstance.post(`${this.path}/login`, bodyData);
    return response.data;
  };

  signup = async (bodyData: SignupValues) => {
    const response = await this.baseInstance.post(`${this.path}/`, bodyData);
    return response.data;
  };

  emailCheck = async (bodyData: { email: string }) => {
    const response = await this.baseInstance.post(`${this.path}/email`, bodyData);
    return response;
  };

  nicknameCheck = async (bodyData: { nickname: string }) => {
    const response = await this.baseInstance.post(`${this.path}/nickname`, bodyData);
    return response;
  };

  getMyInfo = async () => {
    const response = await this.authInstance.get(`${this.path}`);
    return response.data;
  };

  getUser = async (userId: number) => {
    const response = await this.baseInstance.get(`${this.path}/${userId}`);
    return response.data;
  };

  changeProfileImage = async (data: FormData) => {
    const response = await this.authInstance.put(`${this.path}/profile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  };

  edit = async (bodyData: UserEdit) => {
    const response = await this.authInstance.put(`${this.path}`, bodyData);
    return response;
  };

  changePassword = async (bodyData: { oldPassword: string; newPassword: string }) => {
    const response = await this.authInstance.put(`${this.path}/password`, bodyData);
    return response;
  };
}

export default new UserApi();
