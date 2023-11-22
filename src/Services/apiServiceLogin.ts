import { usePostData } from "./apiService";

export const usePostDataLogin=(params?: any,)=>usePostData('auth/login',params)
