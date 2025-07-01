import { ReactElement, useEffect, useState } from "react";
import subscriptionServices from "@/services/subscription.service";
import { IPlan } from "@/types/Plan";
import { ISubscription } from "@/types/Subscription";
import {useDateFormatter} from "@react-aria/i18n"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
  CheckboxGroup,
  Divider,
  Tooltip,
  DateRangePicker,
  DateValue,
  Spinner
} from "@nextui-org/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiSunrise, FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { ChipCheckbox } from "./ChipCheckbox";
import { CalendarDate, fromDate, getLocalTimeZone, parseAbsolute, parseAbsoluteToLocal, parseDate } from "@internationalized/date";

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
  const [active, setActive] = useState<boolean>(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [pauseDate, setPauseDate] = useState<{ start: CalendarDate|null; end: CalendarDate|null}>();

  useEffect(() => {
    if (subscription.pauseStart && subscription.pauseEnd) {
      const startZDT = parseAbsoluteToLocal(subscription.pauseStart.toString());
      const endZDT = parseAbsoluteToLocal(subscription.pauseEnd.toString());

      const start = new CalendarDate(startZDT.year, startZDT.month, startZDT.day);
      const end = new CalendarDate(endZDT.year, endZDT.month, endZDT.day);

      setPauseDate({ start, end });
    } else {
      setPauseDate({ start: null, end: null });
    }

    during();
  }, [subscription]);

  let totalPrice = 0;
  if(plan?.price){
    totalPrice = plan?.price * subscription.mealType.length*subscription.deliveryDays.length * 4.3;
  }

  const pause = async () => {
    try {
      if (!pauseDate || !pauseDate.start || !pauseDate.end) {
        console.log("Pause date is incomplete");
        return;
      }
      setIsPausing(true);
      await subscriptionServices.pause({
        pauseStart: pauseDate.start.toDate(getLocalTimeZone()),
        pauseEnd: pauseDate.end.toDate(getLocalTimeZone()),
      });
      const updated = await subscriptionServices.show(); // You must implement this in your service
      subscription = updated.data.data;
      during();
    } catch (error:any) {
      console.error("Failed to pause:", error);
    } finally {
      setIsPausing(false);
    }
  };

  const during=()=>{
    const { pauseStart, pauseEnd } = subscription;
    // If no pause set → it's active
    if (!pauseStart || !pauseEnd) {
      setActive(true);
      return;
    }

    const startZDT = parseAbsoluteToLocal(pauseStart.toString());
    const endZDT = parseAbsoluteToLocal(pauseEnd.toString());

    const startDate = new CalendarDate(startZDT.year, startZDT.month, startZDT.day).toDate(getLocalTimeZone());
    const endDate = new CalendarDate(endZDT.year, endZDT.month, endZDT.day).toDate(getLocalTimeZone());

    const now = new Date();

    const isPaused = now >= startDate && now <= endDate;
    setActive(!isPaused);
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
    <Card className="w-[360px] md:w-[400px] p-4" shadow="sm" radius="sm">
      <CardHeader className="flex justify-between">
        <Tooltip content={
          <span className="max-w-64">{plan?.description}</span>
        } showArrow={true} placement="right" containerPadding={2} shouldFlip={true}>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{plan?.name} Plan</h1>
            <IoMdInformationCircleOutline size={24}/>
          </div>
        </Tooltip>
        <Chip color={active?"success":"warning"} variant="flat">{active ? "Active":"Paused"}</Chip>
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
        <div className="flex w-full gap-x-4 justify-between items-center">
          {/* @ts-ignore */}
          <DateRangePicker label="Pause subscription" value={pauseDate} onChange={setPauseDate} granularity="day" radius="sm" variant="bordered"/>
          <Button onPress={pause} disabled={isPausing} radius="sm" color="warning" variant="ghost">
            {isPausing ? <Spinner></Spinner> : "Set range"}
          </Button>
        </div>
        <Divider></Divider>
        <div className="flex justify-end items-center w-full gap-x-4">
          <Button radius="sm" onPress={unsubscribe} isLoading={isUnsubscribing} variant="ghost" color="danger">
            Unsubscribe
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionData;