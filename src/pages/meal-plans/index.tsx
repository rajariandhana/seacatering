/*
Customers should be able to explore available meal plans through an intuitive and interactive display.
Requirements:
Create a Menu / Meal Plans page that displays the different meal plans using interactive components (e.g., cards, collapsible sections, or modal pop-ups).
Each meal plan should show:
Plan Name
Meal Plan Price
Description
Image (optional)
Implement a "See More Details" button that opens a modal/pop-up showing additional plan information.

klik(card) -> modal
*/
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import PlanCard, { Plan } from "@/components/views/meal-plan/PlanCard";
import { domine } from "@/utils/fonts";
import { useEffect, useState } from "react";
import planServices from "@/services/plan.service";
const tempPlans: Plan[] = [
  {
    key: 'fit-and-fresh',
    name: 'Fit and Fresh',
    description:
      'Perfect for busy professionals, this plan includes 2 balanced meals per day with a mix of lean proteins, whole grains, and fresh vegetables. Great for maintaining energy throughout the day.',
    price: 40000,
    calories:'700 - 800',
    suitableFor:'Office workers, students',
    highlights:['balanced nutrition', 'low sugar', 'moderate carbs'],
  },
  {
    key: 'weight-loss',
    name: 'Weight Loss',
    description:
      'Designed for those looking to shed a few kilos, this low-calorie plan focuses on portion control, high fiber, and nutrient-dense meals that keep you full without the extra calories.',
    price: 50000,
    calories:'350 - 400',
    suitableFor:'Dieters, health-conscious individuals',
    highlights:['calorie-controlled', 'low-fat', 'high-fiber'],
  },
  {
    key: 'muscle-gain',
    name: 'Muscle Gain',
    description:
      'Packed with high protein options, this plan supports your fitness goals and recovery. Ideal for gym-goers and athletes looking to build lean muscle mass.',
    price: 60000,
    calories:'650 - 800',
    suitableFor:'Athletes, bodybuilders',
    highlights:['high-protein', 'energy-dense', 'performance-focused'],
  },
  {
    key: 'vegetarian',
    name: 'Vegetarian',
    description:
      'A fully plant-based plan featuring hearty grains, legumes, and vibrant vegetables. Perfect for vegetarians or anyone wanting to eat cleaner without sacrificing flavor.',
    price: 45000,
    calories:'450 - 500',
    suitableFor:'Vegetarians, clean eaters',
    highlights:['100% plant-based', 'dairy-free', 'antioxidant-rich'],
  },
];


export default function MealPlansPage() {
  const [plans, setPlans]=useState<Plan[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await planServices.findAll();
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // if (loading) return <p>Loading plans...</p>;

  return (
    <>
    <section className="flex flex-col items-center justify-center">
        <h1 className={`text-2xl lg:text-4xl mb-12 ${domine.className}`}>
          Find the right meal plan for you
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan.key} plan={plan}></PlanCard>
          ))}
        </div>      
      </section>
    </>
  );
}
