import { domine } from "@/utils/fonts";
import { Form, Input, Textarea, Button } from "@nextui-org/react";
import { Rating } from "@mui/material";
import { useState } from "react";

const TestimonialForm = () => {
  const [star, setStar] = useState<number | null>(4);

  return(
    <Form className="w-full flex flex-col items-center justify-center gap-y-8">
      <h1 className={`${domine.className} text-2xl`}>Leave your experience with us</h1>
      <Input type="text" label="Your name" isRequired labelPlacement="outside" errorMessage="Please fill your name" name="name"
      placeholder="Johnny" variant="faded" radius="sm"
      className="w-3/4 lg:w-1/2 rounded-md"/>
      <Textarea type="textarea" label="Your message" isRequired labelPlacement="outside" errorMessage="Please fill your name" name="name"
      placeholder="You have inspired me to live better" variant="faded" radius="sm"
      className="w-3/4 lg:w-1/2 rounded-md"/>
      <Rating
        name="star"
        value={star}
        size="large"
        onChange={(event, newStar) => {
          setStar(newStar);
        }}
      />
      <Button type="submit" radius="sm" className="bg-orange-400 font-semibold w-32">
        Submit
      </Button>
    </Form>
  )
}
export default TestimonialForm;