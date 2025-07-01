import DashboardLayout from "@/components/Layouts/DashboardLayout";
import PlanCreate from "@/components/views/meal-plan/PlanCreate";
import PlanTable from "@/components/views/meal-plan/PlanTable";

const Plans = () => {
  return (
    <DashboardLayout title="Plans" type="admin">
      <PlanCreate></PlanCreate>
      <PlanTable></PlanTable>
    </DashboardLayout>
  )
}

export default Plans;