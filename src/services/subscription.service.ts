import instance from "@/libs/axios/instance";
import { ISubscription } from "@/types/Subscription";

const subscriptionServices = {
    create: (payload:ISubscription) =>
        instance.post(`/subscription`, payload),
    show: () =>
        instance.get('/subscription'),
    togglePause: () => 
        instance.patch('/subscription'),
    delete: () => 
        instance.delete('/subscription'),
};
export default subscriptionServices;