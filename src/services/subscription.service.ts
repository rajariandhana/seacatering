import instance from "@/libs/axios/instance";
import { ISubscription } from "@/types/Subscription";

const subscriptionServices = {
    create: (payload:ISubscription) =>
        instance.post(`/subscription`, payload),
    show: () =>
        instance.get('/subscription'),
    pause: (payload:{pauseStart:Date;pauseEnd:Date;}) => 
        instance.patch('/subscription',payload),
    delete: () => 
        instance.delete('/subscription'),
};
export default subscriptionServices;