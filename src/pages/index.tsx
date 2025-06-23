// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import { Link,Button } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <section>
        {/* HERO */}
        <h1 className="text-4xl">Healthy Meals, Anytime, Anywhere</h1>
        <h2>SUBTEXT</h2>
        <Button
          as={Link}
          href="/"
          // className="bg-orange-400 px-4 py-2 rounded-full"
          color="primary"
        >
          SEE PLANS
        </Button>
      </section>
      <section>
        <h1>Why we{"'"}re the right choice for you</h1>
        {/* 3 cards: Meal Customization, Delivery, Detailed */}
      </section>
    </>
  );
}
