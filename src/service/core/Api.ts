import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import TokenStorage from '~/utils/storage/TokenStorage';

export default class Api {
  private readonly API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT as string;

  private interceptors = (instance: AxiosInstance): AxiosInstance => {
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

  private createInstance = (url: string, config?: AxiosRequestConfig<any>): AxiosInstance => {
    return axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    });
  };

  private baseAPI = (url: string, config?: AxiosRequestConfig<any>): AxiosInstance => {
    return this.createInstance(url, config);
  };
  private authAPI = (url: string, config?: AxiosRequestConfig<any>): AxiosInstance => {
    return this.interceptors(this.createInstance(url, config));
  };

  protected baseInstance = this.baseAPI(this.API_END_POINT);
  protected authInstance = this.authAPI(this.API_END_POINT);
}
