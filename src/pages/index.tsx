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
import { Domine } from "next/font/google";

import { Link,Button } from "@nextui-org/react";
const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});
export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="flex flex-col gap-y-2">
          <h1 className={`text-6xl ${domine.className}`}>
            Healthy Meals, Anytime, Anywhere
          </h1>
          <p>
            Enjoy the freedom of healthy eating with SEA Catering. Whether you{"'"}re at home, at work, or on the go, we deliver freshly prepared, customizable meals to your doorstep—anywhere in Indonesia. Say goodbye to mealtime stress and hello to nutritious, delicious convenience.
          </p>
          <Button
            as={Link}
            href="/"
            className="bg-orange-400 rounded-full w-fit font-semibold"
          >
            SEE PLANS
          </Button>
        </div>
        <Image src="/pasta.png"alt="pasta">

        </Image>
      </section>
          </>
  );
}
