import { Button, Card, CardBody, CardFooter, Form, Input, Textarea } from "@nextui-org/react";
import { formLabel } from "../subscription/SubscriptionForm";
import { useState } from "react";
import planServices from "@/services/plan.service";
import { IPlan } from "@/types/Plan";

const PlanCreate=()=>{
  const [planName, setPlanName]=useState<string>();
  const [planDescription, setPlanDescription]=useState<string>();
  const [planPrice, setPlanPrice]=useState<number>();

  const handleSubmit = async () => {
    if(!planName || !planDescription || planPrice===undefined){
      return;
    }

    try {
      await planServices.create({
        name: planName,
        description: planDescription,
        price: planPrice
      });
      window.location.reload(); // or trigger re-fetch
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  }
  return(
    <Card radius="sm" className="w-[400px] md:w-[800px] mb-8">
      <Form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-y-4">
          <div className="flex justify-between w-full gap-4">
            <Input
              type="text"
              label={formLabel("Plan name")}
              labelPlacement="outside"
              value={planName}
              onValueChange={setPlanName}
              isRequired
              variant="faded"
              radius="sm"
              className="rounded-md w-1/2"
              required
            />
            <Input
              type="number"
              label={formLabel("Plan price")}
              labelPlacement="outside"
              // @ts-ignore
              value={planPrice}
              // @ts-ignore
              onValueChange={setPlanPrice}
              isRequired
              variant="faded"
              radius="sm"
              className="rounded-md w-1/2"
              required
              />
          </div>
            <Textarea
              type="text"
              label={formLabel("Plan description")}
              labelPlacement="outside"
              value={planDescription}
              onValueChange={setPlanDescription}
              isRequired
              variant="faded"
              radius="sm"
              className="rounded-md w-full"
              required
            />
          </CardBody>
          <CardFooter>
            <Button type="submit">
              Create Plan
            </Button>
          </CardFooter>
        </Form>
    </Card>
  )
}
export default PlanCreate;