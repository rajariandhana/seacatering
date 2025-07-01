import Layout from "@/components/Layout";
import TestimonialForm from "@/components/views/home/TestimonialForm";
import { Avatar, Button, Card,CardBody, CardFooter, CardHeader, Link, User } from "@nextui-org/react";
import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { domine } from "@/utils/fonts";

export default function ContactUsPage() {
    const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <Card className="w-[400px] p-2" radius="sm" shadow="sm">
          <CardHeader>
            <h1 className={`font-semibold text-lg -mb-2 ${domine.className}`}>Manager</h1>
          </CardHeader>
          <CardBody>
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://heroui.com/avatars/avatar-7.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text font-semibold leading-none text-default-600">Zoey Lang</h4>
                <h5 className="text-sm tracking-tight text-default-400">+62 8123456789</h5>
              </div>
            </div>
          </CardBody>
          <CardFooter className="px-3 py-0 text-md text-default-400 mb-2">
            <p>
              Brian manages day-to-day operations at SEA Catering, focusing on streamlining logistics and improving customer experience. He{"'"}s closely involved in the app project to help scale the business efficiently.
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[400px] p-2" radius="sm" shadow="sm">
          <CardHeader>
            <h1 className={`font-semibold text-lg -mb-2 ${domine.className}`}>Social Media</h1>
          </CardHeader>
          <CardBody className="w-full flex flex-col gap-4 text-primary">
            <span className="items-center flex gap-4">
              <FaInstagram size={40}/>
              <Link href="https://x.com/seacatering" className="text-lg">@seacatering</Link>
            </span>
            <span className="items-center flex gap-4">
              <FaTwitter size={40}/>
              <Link href="https://instagram.com/seacatering" className="text-lg">@seacatering</Link>
            </span>
            <span className="items-center flex gap-4">
              <FaTiktok size={40}/>
              <Link href="https://tiktok.com/seacatering" className="text-lg">@seacatering</Link>
            </span>
          </CardBody>
        </Card>
      </div>
      <TestimonialForm>
      </TestimonialForm>
    </Layout>
  );
}
