import axios, { AxiosRequestConfig } from 'axios';

const baseUrl='http://localhost:9000/'
const customAxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxiosInstance.interceptors.request.use(
  (axiosConfigRequest: AxiosRequestConfig):any => {
    return axiosConfigRequest;
  }
);
customAxiosInstance.interceptors.response.use(
  (axiosResponse): any => axiosResponse,
  (error): any => {
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({ Message: 'Ocurrió un error de red' });
    }
    return Promise.reject(error);
  }
);

export { customAxiosInstance };
