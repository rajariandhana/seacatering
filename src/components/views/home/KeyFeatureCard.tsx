import { ReactNode } from "react";
import { domine } from "@/utils/fonts";
interface PropType {
  image: ReactNode;        // changed from `imagePath: string`
  title: string;
  description: string;
}

const KeyFeatureCard = (props: PropType) => {
  const { image, title, description } = props;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 items-center gap-2 text-center lg:-w-80">
      <div className="w-full flex justify-center">
        {image}
      </div>
      <div className="">
        <span className={`${domine.className} text-xl lg:text-2xl mt-2`}>{title}</span>
        <p className="mt-1 hidden lg:flex">{description}</p>
      </div>
    </div>
  );
};

export default KeyFeatureCard;
