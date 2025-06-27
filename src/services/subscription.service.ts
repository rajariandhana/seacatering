import instance from "@/libs/axios/instance";
import { ISubscription } from "@/types/Subscription";

const subscriptionServices = {
    create: (payload:ISubscription) =>
        instance.post(`/subscription/create`, payload),
};
export default subscriptionServices;