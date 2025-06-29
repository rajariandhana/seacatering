import { ReactElement, useState } from "react";
import subscriptionServices from "@/services/subscription.service";
import { IPlan } from "@/types/Plan";
import { ISubscription } from "@/types/Subscription";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
  CheckboxGroup,
  Divider,
  Tooltip
} from "@nextui-org/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiSunrise, FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { ChipCheckbox } from "./ChipCheckbox";

const formLabel = (text:string)=>{
  return (
    <span className="text-sm text-black">{text}</span>
  );
}

const mealTypes: { [key: string]: ReactElement } = {
  Breakfast: <FiSunrise />,
  Lunch: <FiSun />,
  Dinner: <IoMoonOutline />
};

const validWeekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const SubscriptionData = ({ subscription, plan, onUnsubscribe }: { subscription: ISubscription; plan?: IPlan; onUnsubscribe: ()=>void;}) => {
  const [isPaused, setIsPaused] = useState(subscription.paused);
  const [isPausing, setIsPausing] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  let totalPrice = 0;
  if(plan?.price){
    totalPrice = plan?.price * subscription.mealType.length*subscription.deliveryDays.length * 4.3;
  }

  const togglePause = async () => {
    try {
      setIsPausing(true);
      setIsPaused(!isPaused); // immediately reflect in UI
      await subscriptionServices.togglePause(); // async call to backend
    } catch (error) {
      console.error("Failed to toggle pause:", error);
      setIsPaused(isPaused); // revert if error
    } finally {
      setIsPausing(false);
    }
  };
  
  const unsubscribe=async()=>{
    try {
      setIsUnsubscribing(true);
      await subscriptionServices.delete();
      onUnsubscribe?.();
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    } finally {
      setIsUnsubscribing(false);
    }
  }

  return (
    <Card className="max-w-96 p-4" shadow="sm" radius="sm">
      <CardHeader className="flex justify-between">
        <Tooltip content={
          <span className="max-w-64">{plan?.description}</span>
        } showArrow={true} placement="right" containerPadding={2} shouldFlip={true}>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{plan?.name} Plan</h1>
            <IoMdInformationCircleOutline size={24}/>
          </div>
        </Tooltip>
        {isPaused ? (
          <Chip color="warning" variant="flat">Paused</Chip>
        ) : (
          <Chip color="success" variant="flat">Active</Chip>
        )}
      </CardHeader>
      <Divider></Divider>
      <CardBody className="flex flex-col gap-y-4">
        <CheckboxGroup
          description={`${subscription.mealType.length}x menu(s) a day`}
          label={formLabel("Meal type")}
          orientation="horizontal"
          isReadOnly
          isDisabled
        >
          {subscription.mealType.map((mType) => (
            <ChipCheckbox value={mType} key={mType}>{mealTypes[mType]} {mType}</ChipCheckbox>
          ))}
        </CheckboxGroup>
        <CheckboxGroup
          description={`${subscription.deliveryDays.length}x delivery(ies) a week`}
          label={formLabel("Delivery days")}
          orientation="horizontal"
          isReadOnly
          isDisabled
        >
          {subscription.deliveryDays.map((day) => (
            <ChipCheckbox value={day} key={day}>{day}</ChipCheckbox>
          ))}
        </CheckboxGroup>
        {subscription.allergies && 
          <p>Allergies: {subscription.allergies}</p>
        }
        {subscription.notes && 
          <p>Notes: {subscription.notes}</p>
        }
      </CardBody>
      <Divider></Divider>
      <CardFooter className="flex flex-col w-full gap-y-4">
        <div className="flex flex-col justify-end w-full">
          <div className="flex justify-between w-full text-xl">
            <span>Total: </span>
            <span>Rp {(totalPrice).toLocaleString("id-ID")}</span>
          </div>
          <span className="text-xs text-right text-gray-500">({subscription.mealType.length*subscription.deliveryDays.length}x meals a week)</span>
          <div className="flex justify-between w-full text-md">
            <span>Phone number: </span>
            <span className="text-gray-500">{subscription.phoneNumber}</span>
          </div>
        </div>
        <Divider></Divider>
        <div className="flex justify-between w-full">
          <Button radius="sm" onClick={togglePause} isLoading={isPausing} variant="ghost" color="warning">
            {isPaused ? "Unpause" : "Pause"}
          </Button>
          <Button radius="sm" onClick={unsubscribe} isLoading={isUnsubscribing} variant="ghost" color="danger">
            Unsubscribe
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionData;
