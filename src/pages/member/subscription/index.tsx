import DashboardLayout from "@/components/DashboardLayout";
import SubscriptionData from "@/components/views/subscription/SubscriptionData";
import SubscriptionForm from "@/components/views/subscription/SubscriptionForm";
import planServices from "@/services/plan.service";
import subscriptionServices from "@/services/subscription.service";
import { IPlan } from "@/types/Plan";
import { ISubscription } from "@/types/Subscription";
import { Skeleton } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<ISubscription>();
  const [plan, setPlan] = useState<IPlan>();
  const [loadingSubscription, setLoadingSubscription] = useState<boolean>(true);
  const [loadingPlan, setLoadingPlan] = useState<boolean>(false);

  const fetchSubscription = async () => {
      setLoadingSubscription(true);
      try {
        const response = await subscriptionServices.show();
        setSubscription(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setLoadingSubscription(false);
      }
    };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchPlan = async () => {
    if (!subscription?.planName) return;

    setLoadingPlan(true);
    try {
      const response = await planServices.show(subscription.planName);
      setPlan(response.data);
    } catch (error) {
      console.error("Failed to fetch plan:", error);
    } finally {
      setLoadingPlan(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [subscription]);

  const renderSkeleton = () => (
    <div className="max-w-96 p-4">
      <Skeleton className="h-6 w-2/3 mb-4 rounded-md" />
      <Skeleton className="h-4 w-full mb-2 rounded-md" />
      <Skeleton className="h-4 w-full mb-2 rounded-md" />
      <Skeleton className="h-4 w-1/2 mb-4 rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );

  return (
    <DashboardLayout title="Subscription" type="member">
      {loadingSubscription ? (
        renderSkeleton()
      ) : subscription && !loadingPlan && plan ? (
        <div className="flex flex-col gap-2">
          <span className="ml-1">Current subscription plan</span>
          <SubscriptionData
            subscription={subscription}
            plan={plan}
            onUnsubscribe={() => setSubscription(undefined)}
            />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="ml-1">You have not subscribed yet</span>
          <SubscriptionForm
            onsubscribe={(newSubscription) => setSubscription(newSubscription)}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
