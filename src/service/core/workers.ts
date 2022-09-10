import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import TokenStorage from '~/utils/storage/TokenStorage';

const createInstance = (url: string, config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json'
    },
    ...config
  });
};

const auth = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenStorage.getToken();
      config.headers = {
        Authorization: token || ''
      };
      return config;
    },
    (error) => Promise.reject(error.response)
  );
  return instance;
};

const handleResponse = (res: AxiosResponse) => res;

const handleError = (error: AxiosError) => {
  if (error.response && error.response.status >= 500) {
    window.alert('현재 서버에 문제가 있습니다.');
    console.error(error);
  }
  return Promise.reject(error);
};

export { createInstance, auth, handleResponse, handleError };
