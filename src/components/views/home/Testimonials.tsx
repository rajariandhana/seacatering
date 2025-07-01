import { useEffect, useRef, useState } from "react";
import { domine } from "@/utils/fonts"
import TestimonialCard, { Testimonial } from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import testimonialServices from "@/services/testimonial.service";
import { Skeleton } from "@nextui-org/react";

const TestimonialCardSkeleton=()=>{
  return(
    <div className="flex flex-col p-3 border shadow-sm cursor-pointer hover:shadow-md transition bg-white w-[380px] h-48 gap-y-2">
      <Skeleton className="w-2/6 rounded-md h-6"/>
      <Skeleton className="w-2/5 rounded-md h-6 mb-2"/>
      <Skeleton className="w-full rounded-md h-6"/>
      <Skeleton className="w-full rounded-md h-6"/>
      <Skeleton className="w-3/5 rounded-md h-6"/>
    </div>
  )
}

const Testimonials = () => {

  const [testimonials, setTestimonials]=useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialServices.index();
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  let sliderRef = useRef<any>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    // centerMode:true,
    // className:"center",
    // centerPadding:"60px",
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className={`text-xl lg:text-4xl mb-6 lg:mb-12 ${domine.className}`}>
        Message from our satisfied customers
      </h1>
      {loading?
        <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
          <TestimonialCardSkeleton/>
          <TestimonialCardSkeleton/>
          <TestimonialCardSkeleton/>
        </div>
        :
        <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
            <GrFormPreviousLink onClick={previous} size={40} className="border border-gray-300 rounded-full border- flex items-center justify-center"/>
            <Slider {...settings} ref={sliderRef}
            className='flex flex-row justify-center items-center w-[320px] md:w-[600px] lg:w-[900px] xl:w-[1200px]'>
              {testimonials.map((testimonial,index) => (
                <TestimonialCard key={index} testimonial={testimonial}></TestimonialCard>
              ))}
            </Slider>
            <GrFormNextLink onClick={next} size={40} className="border border-gray-300 rounded-full border- flex items-center justify-center"/>
        </div>
      }
    </section>
  )
}
export default Testimonials;