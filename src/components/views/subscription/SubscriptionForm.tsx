import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Skeleton, Textarea, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaRegMoon, FaUserAlt } from "react-icons/fa";
import PlanRadio from "./PlanRadio";
import { GiDeathSkull } from "react-icons/gi";
import { ChipCheckbox } from "./ChipCheckbox";
import { FiSunrise, FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import {ISubscription } from "@/types/Subscription";
import subscriptionServices from "@/services/subscription.service";
import { useRouter } from "next/router";
import planServices from "@/services/plan.service";
import { calculateTotalPrice } from "@/types/SubscriptionConstants";
import { IPlan } from "@/types/Plan";

export interface SubscriptionData {
  phoneNumber:string;
  planName:string;
  mealType:string[];
  deliveryDays:string[];
  allergies?:string;
  notes?:string;
}

export const CheckIcon = (props:any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export const formLabel = (text:string)=>{
  return (
    <span className="text-sm text-black">{text}</span>
  );
}

const mealTypes = [
  {
    key:'Breakfast',
    icon:<FiSunrise />
  },{
    key:'Lunch',
    icon:<FiSun />
  },{
    key:'Dinner',
    icon:<IoMoonOutline />
  },
]

const validWeekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface Props {
  onsubscribe?: (subscription: ISubscription) => void;
}

const SubscriptionForm = ({ onsubscribe }: Props) => {
  const [submitted, setSubmitted] = useState<SubscriptionData | null>(null);
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [planName, setPlanName]=useState<string|null>(null);
  const [mealType, setMealType]=useState<string[]>([]);
  const [deliveryDays, setDeliveryDays]=useState<string[]>([]);
  const [totalPrice, setTotalPrice]=useState<number>(0);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [plans, setPlans]=useState<IPlan[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      try {
        const response = await planServices.index();
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: ISubscription = {
      phoneNumber: phoneNumber as string,
      planName: planName as string,
      mealType: mealType as string[],
      deliveryDays: deliveryDays as string[],
      allergies: formData.get("allergies") as string || "",
      notes: formData.get("notes") as string || ""
    }
    // console.log(data);
    
    const newErrors: Record<string, string> = {};

    if (!data.phoneNumber || !/^\d+$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number!";
    }
    if(!data.planName){
      newErrors.planName = "Please choose a plan!";
    }
    if(data.mealType.length===0){
      newErrors.mealType = "Please choose at least one meal type!";
    }
    if(data.deliveryDays.length===0){
      newErrors.deliveryDays = "Please choose days to deliver!";
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("setErrors",newErrors);
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }
    // console.log("FE VALIDATED");

    setErrors({});
    setSubmitted(data);
    try {
      const result = await subscriptionServices.create(data);
      if(result.status!==200){
        setErrors({ submit: result.data.message });
        return;
      }
      onsubscribe?.(result.data.data);
    } catch (error) {
      console.error("Subscription failed:", error);
      setSubmitting(false);
    }
  }

  useEffect(()=>{
    let planPrice = plans.find(p=>p.name===planName)?.price;
    if(planPrice){
      setTotalPrice(calculateTotalPrice(planPrice,mealType,deliveryDays));
    }
    // onOpen();
  },[planName, mealType.length, deliveryDays.length, plans]);

  return(
    <>
      <Form
        className="w-[360px] md:w-[480px] flex flex-col justify-center gap-y-8"
        onSubmit={onSubmit}
        validationErrors={errors}>
        <Card fullWidth shadow="sm" radius="sm">
          <CardHeader>
            <h2 className="text-xl font-semibold">Customer information</h2>
          </CardHeader>
          <CardBody>
            <Input
              type="tel"
              label={formLabel("Your phone number")}
              labelPlacement="outside"
              value={phoneNumber}
              onValueChange={setPhoneNumber}
              placeholder="08123456789"
              isRequired={true}
              variant="faded"
              radius="sm"
              className="rounded-md w-3/4"
              startContent={<FaPhoneAlt />}
              description="Used for payment and order updates"
              />
            </CardBody>
        </Card>

        <Card fullWidth shadow="sm" radius="sm">
          <CardHeader>
            <h2 className="text-xl font-semibold -mb-3">Order information</h2>
          </CardHeader>
          <CardBody>
            {loadingPlans ? (
              <Skeleton className="h-20 w-full rounded-md"></Skeleton>
              ):(
                <RadioGroup
                className="mb-8"
                description=""
                label={formLabel("Choose your meal plan")}
                orientation="vertical"
                isRequired={true}
                color="primary"
                onValueChange={setPlanName} value={planName}>
                {plans.map((plan) => (
                  <PlanRadio key={plan.name} plan={plan}></PlanRadio>
                ))}
              </RadioGroup>
              )
            }
            <CheckboxGroup
              className="mb-8"
              description={`${mealType.length}x menu(s) a day`}
              label={formLabel("Meal type")}
              orientation="horizontal"
              isRequired={true}
              color="primary"
              value={mealType}
              onChange={setMealType}
            >
              {mealTypes.map((mType) => (
                <ChipCheckbox value={mType.key} key={mType.key}>{mType.key}{mType.icon}</ChipCheckbox>
              ))}
            </CheckboxGroup>

            <CheckboxGroup
              className="mb-2"
              description={`${deliveryDays.length}x delivery(ies) a week`}
              label={formLabel("Delivery days")}
              orientation="horizontal"
              isRequired={true}
              color="primary"
              value={deliveryDays}
              onChange={setDeliveryDays}
            >
              {validWeekdays.map((day) => (
                <ChipCheckbox value={day} key={day}>{day}</ChipCheckbox>
              ))}
            </CheckboxGroup>
          </CardBody>
        </Card>
        <Card fullWidth shadow="sm" radius="sm">
          <CardHeader>
            <h2 className="text-xl font-semibold -mb-3">Other details</h2>
          </CardHeader>
          <CardBody>
            <Input
              type="text"
              label="Allergies"
              labelPlacement="outside"
              name="allergies"
              placeholder="Peanuts..."
              variant="faded"
              radius="sm"
              className="rounded-md w-full mb-4"
              startContent={<GiDeathSkull />}
            />
            <Textarea
              type="textarea"
              label="Any notes"
              labelPlacement="outside"
              name="notes"
              placeholder="Not spicy please"
              variant="faded"
              radius="sm"
              className="rounded-md w-full"
            />
          </CardBody>
        </Card>
        {phoneNumber && planName && mealType.length>0 && deliveryDays.length>0 && 
          <Card fullWidth shadow="sm" radius="sm">
            <CardHeader>
              <h2 className="text-xl font-semibold -mb-3">Confirmation</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col justify-end">
                <div className="flex justify-between w-full text-xl">
                  <span>Total: </span>
                  <span>Rp {(totalPrice).toLocaleString("id-ID")}</span>
                </div>
                <span className="text-xs text-right text-gray-500">({mealType.length*deliveryDays.length}x meals a week)</span>
              </div>
            </CardBody>          
            <CardFooter>
              <Button type="submit" color="primary" radius="sm" className="w-full text-lg" variant="ghost"
              disabled={submitting} isLoading={submitting}>
                Subscribe
              </Button>
            </CardFooter>
          </Card>
        }
      </Form>
    </>
  )
}
export default SubscriptionForm;

// const plans:Plan[]=[
//   {
//     key: 'diet',
//     name: 'Diet',
//     price: 30000,
//     description: 'A light and balanced option designed to support weight management and healthy eating habits. Ideal for those watching their calorie intake without compromising on taste.'
//   },
//   {
//     key: 'protein',
//     name: 'Protein',
//     price: 40000,
//     description: 'Perfect for active individuals and fitness enthusiasts, this plan is packed with high-quality protein sources to help build and maintain muscle.'
//   },
//   {
//     key: 'royal',
//     name: 'Royal',
//     price: 60000,
//     description: 'Our premium offering featuring gourmet-style meals made with top-tier ingredients. Great for those who want the healthiest, tastiest, and most luxurious meal experience.'
//   }
// ];