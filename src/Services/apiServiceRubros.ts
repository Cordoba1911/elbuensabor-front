
import { useDeleteData, useGetData, usePostData } from './apiService';



export const useGetDataRubros=(params?: any,)=>useGetData('api/v1/rubros/paged',params)
export const usePostDataRubros=(params?: any,)=>usePostData('api/v1/rubros',params)
export const useDeleteDataRubros=(id?: any,)=>useDeleteData( `api/v1/rubros/${id}`)




