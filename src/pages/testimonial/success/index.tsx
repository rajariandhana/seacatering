import Logo from "@/components/Logo";
import { domine, montserrat } from "@/utils/fonts";
import { FaRegCheckCircle } from "react-icons/fa";

export default function TestimonialSuccess() {
  return (
    <div className="flex flex-col justify-center items-center">
      <FaRegCheckCircle size={130} className="text-primary mb-8"/>
      <h1 className={`text-4xl mb-2 ${domine.className}`}>Thanks for your feedback!</h1>
      <p className="text-lg text-center">
        Your feedback allows us to create a better experience for all&nbsp;
        <span className={`font-semibold ${montserrat.className}`}>
          SEA <span className="text-orange-400">Cat</span>ering
        </span>
        &nbsp;customers.
      </p>
    </div>
  );
}
