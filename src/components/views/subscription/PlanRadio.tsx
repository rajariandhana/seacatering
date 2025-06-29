import { cn, Radio } from "@nextui-org/react"
import { Plan } from "../meal-plan/PlanCard"
import { domine } from "@/utils/fonts"

const PlanRadio=({ plan }: { plan: Plan })=>{
  return (
    <Radio 
      classNames={{
        base: cn(
          "gap-4 m-0 bg-white hover:border-orange-300 justify-between border-gray-300 cursor-pointer rounded-md p-4 border-2 w-[360px] md:w-[480px] data-[selected=true]:border-primary",
        ),
      }}
      value={plan.name}
    >
      <div className="flex flex-wrap items-center justify-between w-full">
        <h3 className={`${domine.className} text-md md:text-xl font-semibold mb-0 text-primary ${plan.name==='Vegetarian'?'text-green-600':''}`}>{plan.name}</h3>
        <span className="text-sm md:text-md">
          Rp {(plan.price).toLocaleString("id-ID")} <span className="font-normal">/ meal</span>
        </span>
      </div>
      <p className="text-gray-500 text-sm md:text-medium">
        {plan.description}
      </p>
    </Radio>
  )
}
export default PlanRadio