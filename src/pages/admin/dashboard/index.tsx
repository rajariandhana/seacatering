import DashboardLayout from "@/components/DashboardLayout";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardAdminPage = () => {
  const router = useRouter();

    return (
        <DashboardLayout title="Dashboard" description="Dashboard Admin" type="admin">
          taro apa yak
        </DashboardLayout>
    )
}

export default DashboardAdminPage;