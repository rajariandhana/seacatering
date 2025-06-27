import { domine } from "@/utils/fonts";
import { Form, Input, Textarea, Button } from "@nextui-org/react";
import { Rating } from "@mui/material";
import { useState } from "react";
import { Testimonial } from "./TestimonialCard";
import { ITestimonial } from "@/types/Testimonial";
import testimonialServices from "@/services/testimonial.service";
import { useRouter } from "next/router";

const TestimonialForm = () => {
  const [submitted, setSubmitted] = useState<Testimonial | null>(null);
  const [errors, setErrors] = useState({});
  const [star, setStar] = useState<number>(4);

  const router = useRouter();
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: ITestimonial = {
      name: formData.get("name") as string,
      message: formData.get("message") as string,
      star: star,
    };

    const newErrors: Record<string, string> = {};

    if (!data.name) {
      newErrors.name = "Please fill your name!";
    }
    if (!data.message) {
      newErrors.message = "Please fill your message!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
    try {
      const result = await testimonialServices.create(data);
      if(result.status!==200){
        setErrors({ submit: result.data.message });
        return;
      }
      router.push("/testimonial/success");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <Form
      className="w-full flex flex-col items-center justify-center gap-y-4 lg:gap-y-8"
      onSubmit={onSubmit}
      validationErrors={errors}
    >
      <h1 className={`${domine.className} text-xl lg:text-2xl`}>
        Leave your experience with us
      </h1>

      <Input
        type="text"
        label="Your name"
        labelPlacement="outside"
        name="name"
        placeholder="Johnny"
        isRequired={true}
        variant="faded"
        radius="sm"
        className="w-[300px] lg:w-[400px] rounded-md"
      />

      <Textarea
        type="textarea"
        label="Your message"
        labelPlacement="outside"
        name="message"
        placeholder="You have inspired me to live better"
        isRequired={true}
        variant="faded"
        radius="sm"
        className="w-[300px] lg:w-[400px] rounded-md"
      />

      <Rating
        name="star"
        value={star}
        size="large"
        onChange={(event, newStar) => {
          if (newStar !== null) {
            setStar(newStar);
          }
        }}
      />

      <Button
        type="submit"
        radius="sm"
        className="bg-orange-400 font-semibold w-32"
      >
        Submit
      </Button>
    </Form>
  );
}
export default TestimonialForm;