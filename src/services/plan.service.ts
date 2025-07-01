import instance from "@/libs/axios/instance";
import { IPlan } from "@/types/Plan";

const planServices = {
    index: () =>
        instance.get<IPlan[]>(`/plans`),
    show: (name: string) =>
        instance.get<IPlan>(`/plan`, {
            params: { name },
        }),
    create: (payload:IPlan) =>
        instance.post(`/plan`, payload),
    update: (payload:IPlan, oldPlanName:string) =>
        instance.patch(`/plan`, payload, {
            params: {oldPlanName}
        }),
    delete: (planName:string) =>
        instance.delete(`/plan`, {
            params: {planName}
        }),
};
export default planServices;