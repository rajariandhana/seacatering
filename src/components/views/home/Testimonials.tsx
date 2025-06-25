import { useRef } from "react";
import { domine } from "@/utils/fonts"
import TestimonialCard, { Testimonial } from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNextLink, GrFormPreviousLink,GrNext } from "react-icons/gr";


const testimonials:Testimonial[]=[
  {
    name:'Amanda P.',
    message:'SEA Catering has completely changed the way I eat. The meals are always fresh, flavorful, and I love being able to customize based on my diet. Highly recommend!',
    star:5,
  },
  {
    name:'Rizky H',
    message:'Delivery is fast and the food quality is top-notch. Sometimes the portion feels a bit small, but overall it\'s been a great experience.',
    star:4,
  },
  {
    name:'Clara W.',
    message:'I\'m vegetarian and it\'s usually hard to find meal plans that suit me. SEA Catering\'s Vegetarian Wellness Plan is absolutely perfect!',
    star:5,
  },
  {
    name:'Kevin M.',
    message:'The app makes ordering really easy. I\'ve tried both the Weight Loss and Fit & Fresh plans—both were delicious and kept me full.',
    star:4,
  },
  {
    name:'Yuni S.',
    message:'Good food and I appreciate the detailed nutritional info. Just wish there were more variety in the weekly menus.',
    star:3,
  }
]

const Testimonials = () => {
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
      <h1 className={`text-2xl lg:text-4xl mb-12 ${domine.className}`}>
        Message from our satisfied customers
      </h1>
      <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
          <GrFormPreviousLink onClick={previous} size={40} className="border border-gray-300 rounded-full border- flex items-center justify-center"/>
          <Slider {...settings} ref={sliderRef}
          className='flex flex-row justify-center items-center w-[360px] md:w-[600px] lg:w-[900px] xl:w-[1200px]'>
            {testimonials.map((testimonial,index) => (
              <TestimonialCard key={index} testimonial={testimonial}></TestimonialCard>
            ))}
          </Slider>
          <GrFormNextLink onClick={next} size={40} className="border border-gray-300 rounded-full border- flex items-center justify-center"/>
      </div>
    </section>
  )
}
export default Testimonials;