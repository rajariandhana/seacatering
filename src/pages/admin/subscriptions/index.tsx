import DashboardLayout from "@/components/DashboardLayout";
import { SubscriptionData } from "@/components/views/subscription/SubscriptionForm";
import subscriptionServices from "@/services/subscription.service";
import { ISubscription } from "@/types/Subscription";
import { mealType } from "@/types/SubscriptionConstants";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { during } from "..";

const columns = [
  {key: "userId",label: "Member"},
  // {key: "phoneNumber",label: "Phone Number"},
  {key: "planName",label: "Plan"},
  {key: "mealType",label: "Meal Type"},
  {key: "deliveryDays",label: "Delivery Days"},
  {key: "status",label: "Status"},
  {key: "totalPrice",label: "Total Price (Rp)"},
];

const planColors: Record<string, string> = {
  Diet: "bg-emerald-500 text-white",
  Protein: "bg-rose-500 text-white",
  Royal: "bg-indigo-500 text-white",
};

const renderPlan = (plan: string) => {
  const className = `${planColors[plan] ?? "bg-gray-300 text-black"}`;
  return (
    <Chip
      key={plan}
      radius="sm"
      className={className}
      classNames={{
        base: "w-10 h-6 p-0",
        content: "text-sm",
      }}
    >
      {plan}
    </Chip>
  );
};

const mealTypeColors: Record<string, string> = {
  Breakfast: "bg-red-200",
  Lunch: "bg-green-200",
  Dinner: "bg-blue-200",
};

const renderType = (type: string) => {
  const className = `${mealTypeColors[type] ?? "bg-gray-300 text-black"}`;
  return (
    <Chip
      key={type}
      radius="sm"
      className={className}
      classNames={{
        base: "w-10 h-6 p-0",
        content: "text-sm",
      }}
    >
      {type.slice(0, 3)}
    </Chip>
  );
};

const renderTypeGrid = (types: string[]) => {
  return (
    <div className="grid grid-cols-3 w-fit gap-1">
      {mealType.map((meal) => {
        const hasMeal = types.includes(meal);
        return hasMeal ? renderType(meal) : (
          <div key={meal} className="w-10 h-6 bg-gray-100 rounded-md" />
        );
      })}
    </div>
  );
};

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayColors: Record<string, string> = {
  Monday: "bg-red-200",
  Tuesday: "bg-orange-200",
  Wednesday: "bg-yellow-200",
  Thursday: "bg-green-200",
  Friday: "bg-blue-200",
  Saturday: "bg-purple-200",
  Sunday: "bg-pink-200",
};

const renderDay = (day: string) => {
  const className = `${dayColors[day] ?? "bg-gray-300 text-black"}`;
  return (
    <Chip
      key={day}
      radius="sm"
      className={className}
      classNames={{
        base: "w-10 h-6 p-0",
        content: "text-sm",
      }}
    >
      {day.slice(0, 3)}
    </Chip>
  );
};

const renderDayGrid = (days: string[]) => {
  return (
    <div className="grid grid-cols-7">
      {allDays.map((day) => {
        const hasDay = days.includes(day);
        return hasDay ? renderDay(day) : (
          <div key={day} className="w-10 h-6 bg-gray-100 rounded-md" />
        );
      })}
    </div>
  );
};

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await subscriptionServices.index();
      // @ts-ignore
      // const modifiedData = response.data.data.map((subscription: any) => ({
      //   ...subscription,
      //   mealType: subscription.mealType?.map((type: string) => type.charAt(0)) || [],
      //   deliveryDays: subscription.deliveryDays?.map((day: string) => day.slice(0, 3)) || [],
      // }));
      setSubscriptions(response.data.data);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const renderCell = useCallback((subscription:any,columnKey:any)=>{
    const cellValue = subscription[columnKey];
    switch (columnKey){
      case "userId":
        return(
          <User 
          avatarProps={{showFallback:true,name:cellValue.fullName, src:""}}
          name={cellValue.fullName}
          description={
            // <span className="flex flex-col">
              // <span>{cellValue.email}</span>
              <span className="text-md">{subscription.phoneNumber}</span>
            // </span>
          }/>
        );
      case "planName":
        return renderPlan(cellValue);
      case "mealType":
        return renderTypeGrid(cellValue);
      case "deliveryDays":
        return renderDayGrid(cellValue);
      case "totalPrice":
        return(
          cellValue.toLocaleString("id-ID")
        );
      case "status":
        return(
          <Chip color={during(subscription['pauseStart'], subscription['pauseEnd'])?"success":"warning"} variant="flat">{during(subscription['pauseStart'], subscription['pauseEnd']) ? "Active":"Paused"}</Chip>
        );
      default:
        return cellValue
    }
  },[])

  return (
    <DashboardLayout title="Subscriptions" type="admin">
      {/* {JSON.stringify(subscriptions)} */}
      {/* className="w-[400px] md:w-[800px]" */}
      <Table radius="sm">
        <TableHeader columns={columns}>
          {(column)=>(
            <TableColumn key={column.key}
            align={`${column.key==='totalPrice'?'end':(column.key==='userId'?'start':'center')}`}
            // align="center"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={!loading ? subscriptions ?? [] : []}
          emptyContent={!loading ? "No rows to display." : "Loading..."}
        >
          {(subscription)=>(
            <TableRow key={subscription._id}>
              {(columnKey) => <TableCell>{renderCell(subscription, columnKey as keyof ISubscription)}</TableCell>}
            </TableRow> 
          )}
        </TableBody>
      </Table>
    </DashboardLayout>
  )
}
export default Subscriptions;