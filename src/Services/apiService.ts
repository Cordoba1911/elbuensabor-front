import { useEffect, useState } from 'react';
import { fetchData, postData, deleteData } from './axiosService';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
interface UseOptions {
  onSuccess?: (data: any) => void;
}
/////////////////////////////
//-------USEGETDATA
/////////////////////////////
export const useGetData = (
  url:string,
  params?: any,
  options?: UseOptions
) => {
  const {enqueueSnackbar}=useSnackbar()
  const [data, setData] = useState<any>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataAndHandleSuccess = async () => {
      try {
        const response = await fetchData(url, params);

        // Call the onSuccess callback if provided
        options?.onSuccess?.(response.data);

        setData(response.data);
      } catch (error:any) {
        enqueueSnackbar(error,{variant:'error'})        
        console.error('Error fetching data:', error);
      }
    };

    if (refetch) {
      fetchDataAndHandleSuccess();
      setRefetch(false); // Reset refetch state
    }
  }, [refetch, params, options]);

  return { data, refetch: () => setRefetch(true) };
};
/////////////////////////////
//-------USEPOSTDATA
/////////////////////////////
export const usePostData = (
  url: string,
  data?: any,
  options?: UseOptions
) => {
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);
  const {enqueueSnackbar}=useSnackbar()

  useEffect(() => {
    const postDataAndHandleSuccess = async () => {
      try {
        const response = await postData(url, data);

        options?.onSuccess?.(response.data);
        enqueueSnackbar('Ok',{variant:'success'})        

        setResponse(response);
      } catch (error:any) {
        enqueueSnackbar(error,{variant:'error'})        
        console.error('Error posting data:', error);
      }
    };

    if (refetch) {
      postDataAndHandleSuccess();
      setRefetch(false); 
    }
  }, [refetch, url, data, options]);

  return { response, refetch: () => setRefetch(true) };
};
/////////////////////////////
//-------USEDELETEDATA
/////////////////////////////
export const useDeleteData = (
  url: string,
  options?: UseOptions
) => {
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);
  const {enqueueSnackbar}=useSnackbar()

  useEffect(() => {
    const deleteDataAndHandleSuccess = async () => {
      try {
        const response = await deleteData(url);

        options?.onSuccess?.(response.data);

        enqueueSnackbar('Ok',{variant:'success'})        

        setResponse(response);
      } catch (error:any) {
        enqueueSnackbar(error,{variant:'error'})        
        console.error('Error deleting data:', error);
      }
    };

    if (refetch) {
      
      deleteDataAndHandleSuccess();
      setRefetch(false);
    }
  }, [refetch, url, options]);

  return { response, refetch: () => setRefetch(true) };
};