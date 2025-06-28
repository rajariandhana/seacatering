// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import Dashboard from "@/components/views/Member/Dashboard";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardMemberPage = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const result = await signOut({ redirect: false });
    router.push("/");
  };

    return (
        // <DashboardLayout title="Dashboard" description="Dashboard Member" type="member">
        //     <Dashboard/>
        // </DashboardLayout>
        <div>
          DASHBOARD MEMBERRRRR
          <Button onClick={() =>handleLogout()}>
            Logout
          </Button>
        </div>
    )
}

export default DashboardMemberPage;