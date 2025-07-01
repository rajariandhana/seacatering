import DashboardLayout from "@/components/Layouts/DashboardLayout";
import memberServices from "@/services/member.service";
import { UserExtended } from "@/types/Auth";
import { CalendarDate, parseAbsoluteToLocal, getLocalTimeZone } from "@internationalized/date";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
// import { calculateTotalPrice } from "@/types/SubscriptionConstants";

const columns = [
  {key: "Member"},
  // {key: "Joined Date"},
  {key: "Subscription"},
  // {key: "Price"},
];

export const during=(pauseStart:any, pauseEnd:any)=>{
  // If no pause set → it's active
  if (!pauseStart || !pauseEnd) {
    return true
  }

  const startZDT = parseAbsoluteToLocal(pauseStart.toString());
  const endZDT = parseAbsoluteToLocal(pauseEnd.toString());

  const startDate = new CalendarDate(startZDT.year, startZDT.month, startZDT.day).toDate(getLocalTimeZone());
  const endDate = new CalendarDate(endZDT.year, endZDT.month, endZDT.day).toDate(getLocalTimeZone());

  const now = new Date();

  const isPaused = now >= startDate && now <= endDate;
  return !isPaused;
};

const DashboardAdminPage = () => {
  const [members, setMembers] = useState<UserExtended[]>();
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await memberServices.index();
        // @ts-ignore
        setMembers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const renderCell = useCallback((member:any,columnKey:any)=>{
    const cellValue = member[columnKey];
    switch (columnKey){
      case "Member":
        return(
          <User avatarProps={{showFallback:true, name:member.fullName, src:""}} name={member.fullName} description={member.email}/>
        );
      case "Name":
        return(
          member.fullName
        );
      case "Joined Date":
        return(
          member.createdAt.slice(0,10)
        );
      case "Subscription":
        return(
          member.subscriptionId ? 
          <div className="flex gap-2 justify-start">
            <Chip color="secondary" variant="flat">{member.subscriptionId.planName}</Chip>
            <Chip color={during(member.subscriptionId.pauseStart, member.subscriptionId.pauseEnd)?"success":"warning"} variant="flat">{during(member.subscriptionId.pauseStart, member.subscriptionId.pauseEnd) ? "Active":"Paused"}</Chip>
          </div> :
          <Chip color="danger" variant="flat">not subscribed</Chip>
        );
      // case "Price":
      //   return(
      //     member.subscriptionId ? 
      //     <span>{calculateTotalPrice(member.subscription.plan.price,member.subscription.mealType,member.subscription.deliveryDays)}</span>
      //     :
      //     <Chip color="default" variant="flat">---</Chip>
      //   )
      default:
        return cellValue
    }
  },[])

  return (
    <DashboardLayout title="Members" type="admin">
      {/* {members &&  */}
        <Table radius="sm" className="w-[400px] md:w-[800px]">
          <TableHeader columns={columns}>
            {(column)=>(
              <TableColumn key={column.key} align="start">
                {column.key}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={!loading ? members ?? [] : []}
            emptyContent={!loading ? "No rows to display." : "Loading..."}
          >
            {(member)=>(
              <TableRow key={member.email}>
                {(columnKey) => <TableCell>{renderCell(member, columnKey)}</TableCell>}
              </TableRow> 
            )}
          </TableBody>
        </Table>
      {/* } */}
    </DashboardLayout>
  )
}

export default DashboardAdminPage;