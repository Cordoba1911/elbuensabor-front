
import { useDeleteData, useGetData, usePostData } from './apiService';



export const useGetDataClientes=(params?: any,)=>useGetData('api/v1/clientes/paged',params)
export const usePostDataClientes=(params?: any,)=>usePostData('api/v1/clientes',params)
export const useDeleteDataClientes=(id?: any,)=>useDeleteData( `api/v1/clientes/${id}`)




