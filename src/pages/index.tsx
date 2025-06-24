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

export default function Home() {
  return (
    <>
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
            href="/"
            className="bg-orange-400 rounded-full w-fit font-semibold"
          >
            SEE PLANS
          </Button>
        </div>
        <Image src="/home/pasta.png"alt="pasta">

        </Image>
      </section>
      <section className="w-screen bg-orange-100 px-6 lg:px-12 lg:px-44 py-6 lg:py-12 justify-center items-center">
        {/* <h1 className={`text-center text-4xl ${domine.className}`}>Why we{"'"}re the right choice for you</h1> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <KeyFeatureCard
            title="Customizable Meals"
            description="Tailor your meals to fit your dietary needs, preferences, and lifestyle—because one size doesn't fit all."
            image={
              <Image src="/home/plate.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-10 lg:h-24 w-fit"/>
            }
          />
          <KeyFeatureCard
            title="Nationwide Delivery"
            description="From Jakarta to Jayapura, we deliver fresh meals to major cities across Indonesia."
            image={
              <Image src="/home/indonesia-map.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-10 lg:h-24 w-fit"/>
            }
          />
          <KeyFeatureCard
            title="Nutritional Transparency"
            description="Know exactly what you're eating with detailed nutritional breakdowns for every dish."
            image={
              <Image src="/home/nutrition.png" alt="Delivery Icon" width={0} height={0}  className="rounded-none h-10 lg:h-24 w-fit"/>
            }
          />
        </div>
      </section>
      {/* <section> */}
        {/* <h1>Why we{"'"}re the right choice for you</h1> */}
        {/* 3 cards: Meal Customization, Delivery, Detailed */}
      {/* </section> */}
      {/* <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
          <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-4.jpeg"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
          <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-3.jpeg"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
          <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-2.jpeg"
        />
      </Card>
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-black font-medium text-2xl">Acme camera</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://heroui.com/images/card-example-6.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
          <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-5.jpeg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://heroui.com/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div> */}
    </>
  );
}
