import { usePostData } from "./apiService";

export const usePostDataRegister=(params?: any,)=>usePostData('auth/register',params)
