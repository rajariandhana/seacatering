// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
import {Card, CardHeader, CardFooter, Image} from "@nextui-org/react";
import { domine, montserrat } from "@/utils/fonts";
import KeyFeatureCard from "@/components/views/home/KeyFeatureCard";

import { Link,Button } from "@nextui-org/react";
import Testimonials from "@/components/views/home/Testimonials";
import TestimonialForm from "@/components/views/home/TestimonialForm";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Home() {
  // const [data,setData]=useState();
  // useEffect(()=>{
  //   fetch("http://seacatering-backend.vercel.app/api/dummy")
  //     .then(res => res.json())        // Parse JSON from response
  //     .then(json => setData(json))    // Set the parsed data
  //     .catch(err => console.error(err));
  // },[])
  
  return (
    <Layout>
      {/* @ts-ignore */}
      {/* {data && <span>{data.message}</span>} */}
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:mt-32 px-6">
        <div className="flex flex-col gap-y-2">
          <h1 className={`text-4xl lg:text-6xl ${domine.className}`}>
            Healthy Meals, Anytime, Anywhere
          </h1>
          <p className="mr-8">
            Enjoy the freedom of healthy eating with <span className={`font-semibold ${montserrat.className}`}>SEA <span className="text-orange-400">Cat</span>ering</span>. Whether you{"'"}re at home, at work, or on the go, we deliver freshly prepared, customizable meals to your doorstep—anywhere in Indonesia. Say goodbye to mealtime stress and hello to nutritious, delicious convenience.
          </p>
          <Button
            as={Link}
            href="/meal-plans"
            className="bg-orange-400 rounded-full w-fit font-semibold"
          >
            SEE PLANS
          </Button>
        </div>
        <Image src="/home/pasta.png"alt="pasta">

        </Image>
      </section>
      <section className="w-screen bg-orange-100 px-6 lg:px-12 xl:px-44 py-6 lg:py-12 justify-center items-center">
        {/* <h1 className={`text-center text-4xl ${domine.className}`}>Why we{"'"}re the right choice for you</h1> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <KeyFeatureCard
            title="Customizable Meals"
            description="Tailor your meals to fit your dietary needs, preferences, and lifestyle—because one size doesn't fit all."
            image={
              <Image src="/home/plate.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-16 lg:h-24 w-fit"/>
            }
          />
          <KeyFeatureCard
            title="Nationwide Delivery"
            description="From Jakarta to Jayapura, we deliver fresh meals to major cities across Indonesia."
            image={
              <Image src="/home/indonesia-map.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-16 lg:h-24 w-fit"/>
            }
          />
          <KeyFeatureCard
            title="Nutritional Transparency"
            description="Know exactly what you're eating with detailed nutritional breakdowns for every dish."
            image={
              <Image src="/home/nutrition.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-16 lg:h-24 w-fit"/>
            }
          />
        </div>
      </section>
      <Testimonials/>
      <TestimonialForm/>
    </Layout>
  );
}
