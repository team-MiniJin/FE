import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { MOCK_SERVER_URL } from '@/shared/types/api';

const axiosInstance = axios.create({
  baseURL: MOCK_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 추후 액세스 토큰 추가 예정
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    return Promise.reject(axiosError);
  }
);

const fetcher = async <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  params?: Record<string, any>,
  data?: any
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    params,
    ...(method !== 'get' && data && { data }),
  };
  return axiosInstance(config);
};
export default fetcher;
