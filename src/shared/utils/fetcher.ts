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
      return Promise.reject(
        new Error(error.response?.data?.message || error.message)
      );
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
  data?: any,
  withCredentials?: boolean
): Promise<any> => {
  try {
    const fullUrl = `${baseurl}${url}`;
    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers,
      params,
      withCredentials,
      ...(method !== 'get' && data && { data }),
    };

    const response: AxiosResponse = await axiosInstance(config);
    console.log('요청 성공: ', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      return error;
    }
    console.error('Unexpected error:', error);
    throw error;
  }
};

export default fetcher;
