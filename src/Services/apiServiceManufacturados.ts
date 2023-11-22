
import { useDeleteData, useGetData, usePostData } from './apiService';



export const useGetDataManufacturados=(params?: any,)=>useGetData('api/v1/articuloManufacturados/paged',params)
export const usePostDataManufacturados=(params?: any,)=>usePostData('api/v1/articuloManufacturados',params)
export const useDeleteDataManufacturados=(id?: any,)=>useDeleteData( `api/v1/articuloManufacturados/${id}`)




