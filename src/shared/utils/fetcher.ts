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
    const axiosError = error as AxiosError;
    return Promise.reject(axiosError);
  }
);

const fetcher = async (
  baseurl: string,
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  headers?: Record<string, string>,
  params?: Record<string, any>,
  data?: any
) => {
  const fullUrl = baseurl.concat(url);
  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    headers: headers || {},
    params: params || {},
    ...(method !== 'get' && data && { data }),
  };

  const response = await axiosInstance(config);
  return response;
};

export default fetcher;
