import { Plan } from "@/components/views/meal-plan/PlanCard";
import { mealType } from "./SubscriptionConstants";

interface ISubscription {
  phoneNumber:string;
  planName:string;
  mealType:string[];
  deliveryDays:string[];
  allergies?:string;
  notes?:string;
  paused?:boolean;
}
export type {ISubscription};