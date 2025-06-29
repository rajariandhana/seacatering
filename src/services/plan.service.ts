import instance from "@/libs/axios/instance";
import { IPlan } from "@/types/Plan";

const planServices = {
    index: () =>
        instance.get<IPlan[]>(`/plans`),
    show: (name: string) =>
        instance.get<IPlan>(`/plan`, {
        params: { name },
    }),
};
export default planServices;