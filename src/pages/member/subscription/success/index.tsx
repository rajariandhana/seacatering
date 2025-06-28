import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import { domine, montserrat } from "@/utils/fonts";
import { FaRegCheckCircle } from "react-icons/fa";

export default function SubscriptionSuccess() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <FaRegCheckCircle size={130} className="text-primary mb-8"/>
        <h1 className={`text-4xl mb-2 ${domine.className}`}>You{"'"}re subscribed!</h1>
        <p className="text-lg text-center">
          <span className={`font-semibold ${montserrat.className}`}>
            SEA <span className="text-orange-400">Cat</span>ering
          </span>
          &nbsp;will contact you through your phone number for more details
        </p>
      </div>
    </Layout>
  );
}
