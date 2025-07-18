import { Rating } from "@mui/material";

export interface Testimonial {
  name: string;
  message: string;
  star: number;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex flex-col p-3 border shadow-sm cursor-pointer hover:shadow-md transition bg-white h-48">
      <div className="flex lg:flex-col justify-between">
        <h2 className="font-semibold text-lg lg:text-xl">
          {testimonial.name}
        </h2>
        <Rating value={testimonial.star} className="mb-2"></Rating>
      </div>
      <p>
        {testimonial.message}
      </p>
    </div>
  )
}
export default TestimonialCard;