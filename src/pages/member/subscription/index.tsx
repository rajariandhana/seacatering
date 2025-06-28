import DashboardLayout from "@/components/DashboardLayout";
import SubscriptionForm from "@/components/views/subscription/SubscriptionForm";

export default function SubscriptionPage() {
  return (
    <DashboardLayout title="Subscription" type="member">
      <SubscriptionForm></SubscriptionForm>
    </DashboardLayout>
  );
}
