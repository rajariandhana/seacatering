import instance from "@/libs/axios/instance";
import { ISubscription } from "@/types/Subscription";

const subscriptionServices = {
    subscribe: (payload:ISubscription) =>
        instance.post(`/subscription/subscribe`, payload),
};
export default subscriptionServices;