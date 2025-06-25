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
}

const plans:Plan[]=[
  {
    key: 'diet',
    name: 'Diet',
    price: 30000
  },
  {
    key: 'protein',
    name: 'Protein',
    price: 40000
  },
  {
    key: 'royal',
    name: 'Royal',
    price: 60000
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

const SubscriptionForm=()=>{
  const [submitted, setSubmitted] = useState<SubscriptionData | null>(null);
  const [errors, setErrors] = useState({});
  const [planKey, setPlanKey]=useState<string|null>(null);
  const [mealType, setMealType]=useState<string[]>([]);
  const [deliveryDays, setDeliveryDays]=useState<string[]>([]);
  const [totalPrice, setTotalPrice]=useState<number>(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      <Input
        type="text"
        label="Your name"
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
        label="Your phone number"
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

      <RadioGroup
        description="" label="Choose your meal plan" orientation="vertical" isRequired={true} color="primary"
        onValueChange={setPlanKey}>
        {plans.map((plan) => (
          <PlanRadio key={plan.key} plan={plan}></PlanRadio>
        ))}
      </RadioGroup>

      <CheckboxGroup
        description="" label="Meal type" orientation="horizontal" isRequired={true} color="primary"
        value={mealType}
        onChange={setMealType}
      >
        <ChipCheckbox value="breakfast"><FiSunrise /> Breakfast</ChipCheckbox>
        <ChipCheckbox value="lunch"><FiSun /> Lunch</ChipCheckbox>
        <ChipCheckbox value="dinner"><IoMoonOutline /> Dinner</ChipCheckbox>
      </CheckboxGroup>
      {mealType.length>1 && 
        <span className="text-xl">{mealType.length}x menus a day</span>
      }
      {mealType.length==1 && 
        <span className="text-xl">{mealType.length}x menu a day</span>
      }

      <CheckboxGroup
        description="" label="Delivary days" orientation="horizontal" isRequired={true} color="primary"
        value={deliveryDays}
        onChange={setDeliveryDays}
      >
        <ChipCheckbox value="monday">Monday</ChipCheckbox>
        <ChipCheckbox value="tuesday">Tuesday</ChipCheckbox>
        <ChipCheckbox value="wednesday">Wednesday</ChipCheckbox>
        <ChipCheckbox value="thursday">Thursday</ChipCheckbox>
        <ChipCheckbox value="friday">Friday</ChipCheckbox>
      </CheckboxGroup>
      {deliveryDays.length>1 && 
        <span className="text-xl">{deliveryDays.length}x deliveries a week</span>
      }
      {deliveryDays.length==1 && 
        <span className="text-xl">{deliveryDays.length}x delivery a week</span>
      }

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
      {planKey && mealType.length>0 && deliveryDays.length>0 && 
        <span className="text-xl">TOTAL PRICE: Rp {(totalPrice).toLocaleString("id-ID")}</span>
      }
      <Button type="submit" color="primary" radius="sm" className="w-full text-lg" variant="ghost">
        Subscribe
      </Button>
    </Form>
  )
}
export default SubscriptionForm;