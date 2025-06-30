import { Button, Card, CardBody, CardFooter, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { formLabel } from "../subscription/SubscriptionForm";
import { useState } from "react";
import planServices from "@/services/plan.service";
import { IPlan } from "@/types/Plan";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa6";

const PlanCreate=()=>{
  const [planName, setPlanName]=useState<string>();
  const [planDescription, setPlanDescription]=useState<string>();
  const [planPrice, setPlanPrice]=useState<number>();
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading,setLoading]=useState(false);
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
      router.push('/admin/plans');
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  }
  return(
    <>
      <Button color="primary" endContent={<FaPlus />} radius="sm" className="text-black mb-4" onPress={onOpen}>
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Input
              type="text"
              label={formLabel("Plan name")}
              labelPlacement="outside"
              value={planName}
              onValueChange={setPlanName}
              isRequired
              variant="faded"
              radius="sm"
              className="rounded-md w-full"
              placeholder="Super Diet..."
              />
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
                placeholder="Good for students..."
                />
            <Input
              type="number"
              label={formLabel("Plan price (Rp)")}
              labelPlacement="outside"
              // @ts-ignore
              value={planPrice}
              // @ts-ignore
              onValueChange={setPlanPrice}
              isRequired
              variant="faded"
              radius="sm"
              className="rounded-md w-full"
              placeholder="10000"
              />
          </ModalBody>
          <ModalFooter className="flex flex-col">
            <Button radius="sm" type="submit" isLoading={loading} variant="solid" color="primary" className="text-black text-lg" startContent={<FaPlus />}>
              Submit New Plan
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default PlanCreate;