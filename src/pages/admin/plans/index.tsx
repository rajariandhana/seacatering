import DashboardLayout from "@/components/DashboardLayout";
import PlanCreate from "@/components/views/meal-plan/PlanCreate";
import PlanForm from "@/components/views/meal-plan/PlanEdit";
import planServices from "@/services/plan.service";
import { IPlan } from "@/types/Plan";
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
const columns = [
  {key: "name",label: "Name"},
  {key: "price",label: "Price"},
  {key: "description",label: "Description"},
  {key: "action",label: "Action"}
];

const Plans = () => {
  const [plans, setPlans]=useState<IPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await planServices.index();
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleOpenModal = (plan: IPlan) => {
    setSelectedPlan(plan);
    onOpen();
  };

  const renderCell = useCallback((plan: IPlan, columnKey: string) => {
    const cellValue = plan[columnKey as keyof IPlan];
    switch (columnKey) {
      case "description":
        return (
          <p className="line-clamp-2">{plan.description}</p>
        );
      case "action":
        return (
          <Button size="sm" onPress={() => handleOpenModal(plan)}>
            Edit
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <DashboardLayout title="Plans" type="admin">
      <PlanCreate></PlanCreate>
      {plans && 
        <>
          <Table radius="sm" className="w-[400px] md:w-[800px]">
            <TableHeader columns={columns}>
              {(column)=>(
                <TableColumn key={column.key} align="start">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={plans}>
              {(plan)=>(
                <TableRow key={plan.name}>
                  {(columnKey) => <TableCell>{renderCell(plan, columnKey as string)}</TableCell>}
                </TableRow> 
              )}
            </TableBody>
          </Table>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  {selectedPlan && <PlanForm plan={selectedPlan} />}
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      }
    </DashboardLayout>
  )
}

export default Plans;