
import { useDeleteData, useGetData, usePostData } from './apiService';



export const useGetDataEmpleados=(params?: any,)=>useGetData('api/v1/empleados/paged',params)
export const usePostDataEmpleados=(params?: any,)=>usePostData('api/v1/empleados',params)
export const useDeleteDataEmpleados=(id?: any,)=>useDeleteData( `api/v1/empleados/${id}`)




