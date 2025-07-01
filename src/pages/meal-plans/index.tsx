import PlanCard from "@/components/views/meal-plan/PlanCard";
import { domine } from "@/utils/fonts";
import { useEffect, useState } from "react";
import planServices from "@/services/plan.service";
import Layout from "@/components/Layout";
import { IPlan } from "@/types/Plan";
import { Skeleton } from "@nextui-org/react";

const PlanCardSkeleton=()=>{
  return (
    <div className="w-[360px] p-3 border shadow-sm">
      <Skeleton className="w-full rounded-md mb-4 h-44"/>
      <Skeleton className="w-1/5 rounded-md h-6 mb-2"/>
      <Skeleton className="w-full rounded-md h-6 mb-2"/>
      <Skeleton className="w-full rounded-md h-6 mb-2"/>
      <Skeleton className="w-3/5 rounded-md h-6 mb-24"/>
      <div className="flex justify-between items-center">
        <Skeleton className="w-1/3 rounded-md h-6"/>
        <Skeleton className="w-1/5 rounded-md h-6"/>
      </div>
    </div>
  )
}

export default function MealPlansPage() {
  const [plans, setPlans]=useState<IPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await planServices.index();
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // if (loading) return <p>Loading plans...</p>;

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center">
        <h1 className={`text-2xl lg:text-4xl mb-12 ${domine.className}`}>
          Find the right meal plan for you
        </h1>
        {loading?
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PlanCardSkeleton/>
            <PlanCardSkeleton/>
            <PlanCardSkeleton/>
          </div>
          :
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan}></PlanCard>
            ))}
          </div>
        }
      </section>
    </Layout>
  );
}


// const tempPlans: Plan[] = [
//   {
//     key: 'fit-and-fresh',
//     name: 'Fit and Fresh',
//     description:
//       'Perfect for busy professionals, this plan includes 2 balanced meals per day with a mix of lean proteins, whole grains, and fresh vegetables. Great for maintaining energy throughout the day.',
//     price: 40000,
//     calories:'700 - 800',
//     suitableFor:'Office workers, students',
//     highlights:['balanced nutrition', 'low sugar', 'moderate carbs'],
//   },
//   {
//     key: 'weight-loss',
//     name: 'Weight Loss',
//     description:
//       'Designed for those looking to shed a few kilos, this low-calorie plan focuses on portion control, high fiber, and nutrient-dense meals that keep you full without the extra calories.',
//     price: 50000,
//     calories:'350 - 400',
//     suitableFor:'Dieters, health-conscious individuals',
//     highlights:['calorie-controlled', 'low-fat', 'high-fiber'],
//   },
//   {
//     key: 'muscle-gain',
//     name: 'Muscle Gain',
//     description:
//       'Packed with high protein options, this plan supports your fitness goals and recovery. Ideal for gym-goers and athletes looking to build lean muscle mass.',
//     price: 60000,
//     calories:'650 - 800',
//     suitableFor:'Athletes, bodybuilders',
//     highlights:['high-protein', 'energy-dense', 'performance-focused'],
//   },
//   {
//     key: 'vegetarian',
//     name: 'Vegetarian',
//     description:
//       'A fully plant-based plan featuring hearty grains, legumes, and vibrant vegetables. Perfect for vegetarians or anyone wanting to eat cleaner without sacrificing flavor.',
//     price: 45000,
//     calories:'450 - 500',
//     suitableFor:'Vegetarians, clean eaters',
//     highlights:['100% plant-based', 'dairy-free', 'antioxidant-rich'],
//   },
// ];