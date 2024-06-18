/* eslint-disable consistent-return */
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

const fetcher = async (
  baseurl: string,
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  headers?: Record<string, string>,
  params?: Record<string, any>,
  data?: any
) => {
  try {
    const fullUrl = baseurl.concat(url);
    console.log(fullUrl);
    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers: headers || {},
      params: params || {},
      ...(method !== 'get' && data && { data }),
    };

    const response = await axiosInstance(config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
