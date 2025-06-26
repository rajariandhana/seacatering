import { Button, Checkbox, CheckboxGroup, Form, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaRegMoon, FaUserAlt } from "react-icons/fa";
import { Plan } from "../meal-plan/PlanCard";
import PlanRadio from "./PlanRadio";
import { GiDeathSkull } from "react-icons/gi";
import { ChipCheckbox } from "./ChipCheckbox";
import { FiSunrise, FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

export interface SubscriptionData {
  name:string;
  phoneNumber:string;
  planKey:string;
  mealType:string[];
  deliveryDays:string[];
  allergies?:string;
  notes?:string;
}

const plans:Plan[]=[
  {
    key: 'diet',
    name: 'Diet',
    price: 30000,
    description: 'A light and balanced option designed to support weight management and healthy eating habits. Ideal for those watching their calorie intake without compromising on taste.'
  },
  {
    key: 'protein',
    name: 'Protein',
    price: 40000,
    description: 'Perfect for active individuals and fitness enthusiasts, this plan is packed with high-quality protein sources to help build and maintain muscle.'
  },
  {
    key: 'royal',
    name: 'Royal',
    price: 60000,
    description: 'Our premium offering featuring gourmet-style meals made with top-tier ingredients. Great for those who want the healthiest, tastiest, and most luxurious meal experience.'
  }
];

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

const formLabel = (text:string)=>{
  return (
    <span className="text-sm text-black">{text}</span>
  );
}

const SubscriptionForm=()=>{
  const [submitted, setSubmitted] = useState<SubscriptionData | null>(null);
  const [errors, setErrors] = useState({});
  const [planKey, setPlanKey]=useState<string|null>(null);
  const [mealType, setMealType]=useState<string[]>([]);
  const [deliveryDays, setDeliveryDays]=useState<string[]>([]);
  const [totalPrice, setTotalPrice]=useState<number>(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: SubscriptionData = {
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      planKey: formData.get("planKey") as string,
      mealType: formData.getAll("mealType") as string[],
      deliveryDays: formData.getAll("deliveryDays") as string[],
      allergies: formData.get("allergies") as string || "",
      notes: formData.get("notes") as string || ""
    }
    
    const newErrors: Record<string, string> = {};

    if (!data.name) {
      newErrors.name = "Please fill your name!";
    }
    if (!data.phoneNumber || !/^\d+$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number!";
    }
    if(!data.planKey){
      newErrors.planKey = "Please choose a plan!";
    }
    if(data.mealType.length===0){
      newErrors.mealType = "Please choose at least one meal type!";
    }
    if(data.deliveryDays.length===0){
      newErrors.deliveryDays = "Please choose days to deliver!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
    // send to server then setSubmitted(null) to reset;
    // setSubmitted(null);
    // console.log(data);
  }

  useEffect(()=>{
    let planPrice = plans.find(p=>p.key===planKey)?.price;
    // setTotalPrice(planPrice * 3);
    if(planPrice){
      setTotalPrice(planPrice * mealType.length * deliveryDays.length * 4.3);
    }
  },[planKey,mealType.length,deliveryDays.length]);

  return(
    <Form
      className="w-[360px] md:w-[480px] flex flex-col justify-center gap-y-8"
      onSubmit={onSubmit}
      validationErrors={errors}>
      <div className="w-full flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold  -mb-2">Customer information</h2>
        <Input
          type="text"
          label={formLabel("Your name")}
          labelPlacement="outside"
          name="name"
          placeholder="Johnny"
          isRequired={true}
          variant="faded"
          radius="sm"
          className="rounded-md w-full"
          startContent={<FaUserAlt />}
        />

        <Input
          type="numeric"
          label={formLabel("Your phone number")}
          labelPlacement="outside"
          name="phoneNumber"
          placeholder="08123456789"
          isRequired={true}
          variant="faded"
          radius="sm"
          className="rounded-md w-3/4"
          startContent={<FaPhoneAlt />}
          description="Used for payment and order updates"
        />
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold -mb-3">Order information</h2>
        <RadioGroup
          description=""
          label={formLabel("Choose your meal plan")}
          orientation="vertical"
          isRequired={true}
          color="primary"
          onValueChange={setPlanKey}>
          {plans.map((plan) => (
            <PlanRadio key={plan.key} plan={plan}></PlanRadio>
          ))}
        </RadioGroup>

        <CheckboxGroup
          description=""
          label={formLabel("Meal type")}
          orientation="horizontal"
          isRequired={true}
          color="primary"
          value={mealType}
          onChange={setMealType}
        >
          <ChipCheckbox value="breakfast"><FiSunrise /> Breakfast</ChipCheckbox>
          <ChipCheckbox value="lunch"><FiSun /> Lunch</ChipCheckbox>
          <ChipCheckbox value="dinner"><IoMoonOutline /> Dinner</ChipCheckbox>
        </CheckboxGroup>
        {mealType.length>0 && 
          <span className="text-sm text-gray-500 -mt-2">{mealType.length}x menu(s) a day</span>
        }
        {mealType.length==0 && 
          <span className="-mt-2 h-5"></span>
        }

        <CheckboxGroup
          description=""
          label={formLabel("Delivery days")}
          orientation="horizontal"
          isRequired={true}
          color="primary"
          value={deliveryDays}
          onChange={setDeliveryDays}
        >
          <ChipCheckbox value="monday">Monday</ChipCheckbox>
          <ChipCheckbox value="tuesday">Tuesday</ChipCheckbox>
          <ChipCheckbox value="wednesday">Wednesday</ChipCheckbox>
          <ChipCheckbox value="thursday">Thursday</ChipCheckbox>
          <ChipCheckbox value="friday">Friday</ChipCheckbox>
          <ChipCheckbox value="saturday">Saturday</ChipCheckbox>
          <ChipCheckbox value="sunday">Sunday</ChipCheckbox>
        </CheckboxGroup>
        {deliveryDays.length>0 && 
          <span className="text-sm text-gray-500 -mt-2">{deliveryDays.length}x delivery(ies) a week</span>
        }
        {deliveryDays.length==0 && 
          <span className="-mt-2 h-5"></span>
        }

      </div>
      <div className="w-full flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold -mb-3">Other details</h2>
        <Input
          type="text"
          label="Allergies"
          labelPlacement="outside"
          name="allergies"
          placeholder="Peanuts..."
          variant="faded"
          radius="sm"
          className="rounded-md w-full"
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
      </div>
      {planKey && mealType.length>0 && deliveryDays.length>0 && 
          <>
            <div className="w-full flex flex-col gap-y-4">
              <h2 className="text-xl font-semibold -mb-3">Confirmation</h2>
              <div className="flex flex-col justify-end">
                <div className="flex justify-between w-full text-xl">
                  <span>Total: </span>
                  <span>Rp {(totalPrice).toLocaleString("id-ID")}</span>
                </div>
                <span className="text-xs text-right text-gray-500">({mealType.length*deliveryDays.length}x meals a week)</span>
              </div>
            </div>
          </>
      }
            <Button type="submit" color="primary" radius="sm" className="w-full text-lg" variant="ghost">
              Subscribe
            </Button>
    </Form>
  )
}
export default SubscriptionForm;