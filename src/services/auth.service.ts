import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister, ILogin } from "@/types/Auth";

const authServices = {
    register: (payload:IRegister) =>
        instance.post(`${endpoint.AUTH}/register`, payload),
    login: (payload:ILogin) =>
        instance.post(`${endpoint.AUTH}/login`, payload),
    getProfileWithToken: (token:string) =>
        instance.get(`${endpoint.AUTH}/me`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
    }),
    getProfile: () =>
        instance.get(`${endpoint.AUTH}/me`),
    update: (payload:any) => 
        instance.patch(`${endpoint.AUTH}`, payload)
};
export default authServices;