import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { UserExtended } from "@/types/Auth";

const memberServices = {
    index: ()=> instance.get<UserExtended[]>(`/members`),
    // register: (payload:IRegister) =>
    //     instance.post(`${endpoint.AUTH}/register`, payload),
    // login: (payload:ILogin) =>
    //     instance.post(`${endpoint.AUTH}/login`, payload),
    // getProfileWithToken: (token:string) =>
    //     instance.get(`${endpoint.AUTH}/me`, {
    //         headers:{
    //             Authorization: `Bearer ${token}`,
    //         }
    // }),
    // getProfile: () =>
    //     instance.get(`${endpoint.AUTH}/me`)
};
export default memberServices;