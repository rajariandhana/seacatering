import DashboardLayout from "@/components/DashboardLayout";
import useGetProfile from "@/utils/useGetProfile";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardMemberPage = () => {
  const router = useRouter();
  const session = useSession();
  const {dataProfile} = useGetProfile();
    return (
        <DashboardLayout title="Dashboard" type="member">
          {dataProfile && (
            <>Hello, {dataProfile.fullName}</>
          )}
        </DashboardLayout>
    )
}

export default DashboardMemberPage;