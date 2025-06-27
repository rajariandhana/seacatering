import instance from "@/libs/axios/instance";
import { ITestimonial } from "@/types/Testimonial";

const testimonialServices = {
    findAll: () =>
        instance.get<ITestimonial[]>(`/testimonial/find-all`),
    create: (payload:ITestimonial) =>
        instance.post(`/testimonial/create`, payload),
};
export default testimonialServices;