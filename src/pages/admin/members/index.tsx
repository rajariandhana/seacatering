import DashboardLayout from "@/components/DashboardLayout";
import memberServices from "@/services/member.service";
import { UserExtended } from "@/types/Auth";
import { Avatar, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { calculateTotalPrice } from "@/types/SubscriptionConstants";
const columns = [
  {key: "Member"},
  // {key: "Joined Date"},
  {key: "Subscription"},
  // {key: "Price"},
];

const DashboardAdminPage = () => {
  const [members, setMembers] = useState<UserExtended[]>();
  const [loadingMembers, setLoadingMembers] = useState<boolean>(true);
  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      try {
        const response = await memberServices.index();
        // @ts-ignore
        setMembers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setLoadingMembers(false);
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
          <div className="flex gap-2">
            <Chip color="secondary" variant="flat">{member.subscriptionId.planName}</Chip>
            {member.subscriptionId.paused===false ?
            <Chip color="success" variant="flat">Active</Chip> : (
              member.subscriptionId ? 
              <Chip color="warning" variant="flat">Paused</Chip>:<></>
            )}
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
      {members && 
        <Table radius="sm" className="w-[400px] md:w-[800px]">
          <TableHeader columns={columns}>
            {(column)=>(
              <TableColumn key={column.key} align="start">
                {column.key}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={members}>
            {(member)=>(
              <TableRow key={member.email}>
                {(columnKey) => <TableCell>{renderCell(member, columnKey)}</TableCell>}
              </TableRow> 
            )}
          </TableBody>
        </Table>
      }
    </DashboardLayout>
  )
}

export default DashboardAdminPage;