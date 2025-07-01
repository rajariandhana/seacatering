import { IPlan } from "@/types/Plan";
import { domine } from "@/utils/fonts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure
} from "@nextui-org/react";
import Link from "next/link";

export const PlanCard = ({ plan }: { plan: IPlan }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className="p-3 border shadow-sm cursor-pointer hover:shadow-md transition"
      >
        <Image src={`/meal-plan/${plan.name}.avif`} alt={`${plan.name}`} width={0} height={0}
          className="w-full rounded-none mb-4">
        </Image>
        <h3 className={`${domine.className} text-xl font-semibold mb-0 text-orange-400 ${plan.name==='Vegetarian'?'text-green-600':''}`}>{plan.name}</h3>
        <p className="text-gray-700 lg:h-24 xl:h-40">{plan.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            Rp {(plan.price).toLocaleString("id-ID")} <span className="font-normal">/ meal</span>
          </span>
          <Button onPress={onOpen} className="bg-orange-400 rounded-md font-semibold">
            See more
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="rounded-md border">
          {(onClose) => (
            <>
              {/* <ModalHeader 
              className={`${domine.className} flex justify-center text-3xl text-center font-semibold mb-0 text-orange-400 ${plan.key==='vegetarian'?'text-green-600':''}`}
              >
                {plan.name}
              </ModalHeader> */}
              <ModalBody className="p-4 gap-y-0 text-lg">
                <Image src={`/meal-plan/${plan.name}.avif`} alt={`${plan.name}`} width={0} height={0}
                  className="w-full rounded-none mb-4">
                </Image>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`${domine.className} text-2xl font-semibold mb-0 text-orange-400 ${plan.name==='Vegetarian'?'text-green-600':''}`}>{plan.name}</h3>
                  <span className="font-semibold text-md">{plan.calories} kcal</span>
                </div>
                <p className="mb-1">{plan.description}</p>
                <p className="mb-1 text-gray-500">Suitable for {plan.suitableFor}</p>
                <div className="flex flex-wrap gap-2">
                  {plan.highlights?.map((highlight) => (
                    <span key={highlight}
                    className="text-sm px-2 py-1 rounded-sm bg-orange-200 text-black">{highlight}</span>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                <span className="text-lg font-semibold mb-1">
                  Rp {(plan.price).toLocaleString("id-ID")} <span className="font-normal">/ meal</span>
                </span>
                <div className="flex gap-2">
                  <Button variant="light" onPress={onClose} className="rounded-md border">
                    Close
                  </Button>
                  <Button as={Link} href="/member/subscription" className="rounded-md bg-orange-400 font-semibold">
                    Choose plan
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanCard;
