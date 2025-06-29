import { IPlan } from "@/types/Plan";
import { Input, ModalHeader, ModalBody, Textarea, ModalFooter, Button } from "@nextui-org/react";
import { formLabel } from "../subscription/SubscriptionForm";
import { useEffect, useState } from "react";
import planServices from "@/services/plan.service";

const PlanEdit=({plan}:{plan:IPlan})=>{
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newPlan, setNewPlan] = useState<IPlan>({name: "",price: 0,description: "",});

  useEffect(() => {
    setNewPlan(plan);
  }, [plan]);


  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await planServices.update(newPlan,plan.name);
      window.location.reload();
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
      window.location.reload();
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
            />
        <Input
          type="number"
          label={formLabel("Plan price")}
          labelPlacement="outside"
          value={newPlan.price.toString()}
          onValueChange={(value) =>
            setNewPlan((prev) => ({ ...prev, price: Number(value) }))
          }
          isRequired
          variant="faded"
          radius="sm"
          className="rounded-md w-full"
          />
      </ModalBody>
      <ModalFooter className="flex flex-col">
        <Button radius="sm" onClick={handleUpdate} isLoading={isUpdating} variant="ghost" color="warning">
            Update (will change the member{"'"}s price)
          </Button>
          <Button radius="sm" onClick={handleDelete} isLoading={isDeleting} variant="ghost" color="danger">
            Delete (will unsubscribe members with this plan)
          </Button>
      </ModalFooter>
    </>
  )
}
export default PlanEdit;