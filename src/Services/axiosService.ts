import axios, { AxiosRequestConfig,AxiosResponse } from 'axios';

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

const token=window.localStorage.getItem('token')


export const fetchData = async (
  url: string,
  params?: any
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(
      `${baseUrl}${url}`, 
      { 
        params, 
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );
    return response;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};

export const postData = async (
  url: string,
  data?: any
): Promise<AxiosResponse<any>> => {

  try {
    const response = await axios.post(
      `${baseUrl}${url}`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
    return response;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};

export const deleteData = async (
  url: string
): Promise<AxiosResponse<any>> => {
  
  try {
    const response = await axios.delete(
      `${baseUrl}${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};