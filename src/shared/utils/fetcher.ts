import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error('An unknown error occurred'));
  }
);

const fetcher = async (
  baseurl: string,
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  headers?: Record<string, string>,
  params?: Record<string, any>,
  data?: any
): Promise<any> => {
  try {
    const fullUrl = `${baseurl}${url}`;
    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers,
      params,
      ...(method !== 'get' && data && { data }),
    };

    const response: AxiosResponse = await axiosInstance(config);
    console.log('요청 성공: ', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};

export default fetcher;
