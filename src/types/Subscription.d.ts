interface ISubscription {
  name:string;
  phoneNumber:string;
  planKey:string;
  mealType:string[];
  deliveryDays:string[];
  allergies?:string;
  notes?:string;
}

export type {ISubscription};