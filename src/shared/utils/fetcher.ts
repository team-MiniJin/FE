import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return Promise.reject(axiosError);
    }
    return Promise.reject(error);
  }
);

const fetcher = async <T>(
  baseurl: string,
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  headers?: Record<string, string>,
  params?: Record<string, any>,
  data?: any
): Promise<T> => {
  const fullUrl = baseurl.concat(url);
  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    headers:
      { ...headers, 'Cache-Control': 'max-age=31536000, immutable' } || {},
    params: params || {},
    ...(method !== 'get' && data && { data }),
  };
  return axiosInstance(config);
};

export default fetcher;
