import axios, { AxiosRequestConfig } from 'axios';

const customAxiosInstance = axios.create({
  baseURL: 'ACA SE PONE LA URL BASE',
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
