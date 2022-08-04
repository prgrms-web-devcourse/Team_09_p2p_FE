import Api from '~/service/core/Api';
import { LoginValues, SignupValues } from '~/types';

class UserApi extends Api {
  private path = '/users';

  login = async (bodyData: LoginValues) => {
    try {
      const response = await this.baseInstance.post(`${this.path}/login`, bodyData);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`로그인 에러: ${e}`);
    }
  };

  signup = async (bodyData: SignupValues) => {
    try {
      const response = await this.baseInstance.post(`${this.path}`, bodyData);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(`회원가입 에러: ${e}`);
    }
  };
}

export default new UserApi();
