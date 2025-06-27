import instance from "@/libs/axios/instance";
import { IPlan } from "@/types/Plan";

const planServices = {
    findAll: () =>
        instance.get<IPlan[]>(`/plan/find-all`),
};
export default planServices;