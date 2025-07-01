import { IPlan } from "@/types/Plan";
import { Input, ModalHeader, ModalBody, Textarea, ModalFooter, Button } from "@nextui-org/react";
import { formLabel } from "../subscription/SubscriptionForm";
import { useEffect, useState } from "react";
import planServices from "@/services/plan.service";
import { useRouter } from "next/router";
import { CiEdit, CiTrash } from "react-icons/ci";

const PlanEdit=({plan,onSuccess}:{plan:IPlan;onSuccess:()=>void})=>{
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newPlan, setNewPlan] = useState<IPlan>({name: "",price: 0,description: "",});
  const router = useRouter();
  useEffect(() => {
    setNewPlan(plan);
  }, [plan]);


  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await planServices.update(newPlan,plan.name);
      // router.push('/admin/plans');
      onSuccess();
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await planServices.delete(plan.name);
      // router.push('/admin/plans');
      onSuccess();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ModalHeader></ModalHeader>
      <ModalBody>
        <Input
          type="text"
          label={formLabel("Plan name")}
          labelPlacement="outside"
          value={newPlan.name}
          onValueChange={(value) => setNewPlan((prev) => ({ ...prev, name: value }))}
          isRequired
          variant="faded"
          radius="sm"
          className="rounded-md w-full"
          placeholder={newPlan.name}
          />
        <Textarea
          type="text"
            label={formLabel("Plan description")}
            labelPlacement="outside"
            value={newPlan.description}
            onValueChange={(value) =>
              setNewPlan((prev) => ({ ...prev, description: value }))
            }
            isRequired
            variant="faded"
            radius="sm"
            className="rounded-md w-full"
            placeholder={newPlan.description}
            />
        <Input
          type="number"
          label={formLabel("Plan price (Rp)")}
          labelPlacement="outside"
          value={newPlan.price.toString()}
          onValueChange={(value) =>
            setNewPlan((prev) => ({ ...prev, price: Number(value) }))
          }
          isRequired
          variant="faded"
          radius="sm"
          className="rounded-md w-full"
          placeholder={newPlan.price.toString()}
          />
      </ModalBody>
      <ModalFooter className="flex flex-col">
        <Button radius="sm" onClick={handleUpdate} isLoading={isUpdating} variant="ghost" color="warning" startContent={<CiEdit size={20}/>}
        className="text-md">
            Update - affects subscription price
          </Button>
          <Button radius="sm" onClick={handleDelete} isLoading={isDeleting} variant="ghost" color="danger" startContent={<CiTrash size={20}/>}
          className="text-md">
            Delete - unsubscribe members with this plan
          </Button>
      </ModalFooter>
    </>
  )
}
export default PlanEdit;