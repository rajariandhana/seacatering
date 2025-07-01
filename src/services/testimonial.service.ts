import instance from "@/libs/axios/instance";
import { ITestimonial } from "@/types/Testimonial";

const testimonialServices = {
    index: () =>
        instance.get<ITestimonial[]>(`/testimonials`),
    create: (payload:ITestimonial) =>
        instance.post(`/testimonial`, payload),
};
export default testimonialServices;