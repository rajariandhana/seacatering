export const mealType = [
  'Breakfast',
  'Lunch',
  'Dinner'
] as const;


const calculateTotalPrice=(planPrice:number, mealType:string[], deliveryDays:string[])=>{
  return 4.3 * planPrice * mealType.length * deliveryDays.length;
}
export {calculateTotalPrice};