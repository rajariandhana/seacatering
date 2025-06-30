import { IPlan } from "@/types/Plan";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import PlanEdit from "@/components/views/meal-plan/PlanEdit";
import { IoIosMore } from "react-icons/io";
import planServices from "@/services/plan.service";

const columns = [
  {key: "name",label: "Name"},
  {key: "price",label: "Price (Rp)"},
  {key: "description",label: "Description"},
  {key: "action",label: "Action"}
];

const PlanTable=()=>{
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [plans, setPlans]=useState<IPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const fetchPlans = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await planServices.index();
      setPlans(response.data);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
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
          <Button size="sm" onPress={() => handleOpenModal(plan)} variant="light">
            <IoIosMore size={20}/>
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleFormSuccess = () => {
    fetchPlans();
    onClose();
  };
  
  return (
    <>
      <Table radius="sm" className="w-[400px] md:w-[800px]">
        <TableHeader columns={columns}>
          {(column)=>(
            <TableColumn key={column.key} align={`${column.key==='action'?"center":"start"}`}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={!loading ? plans ?? [] : []}
          emptyContent={!loading ? "No rows to display." : "Loading..."}>
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
              {selectedPlan && <PlanEdit plan={selectedPlan} onSuccess={handleFormSuccess}/>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PlanTable;