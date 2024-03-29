import UserLayout from "@/src/components/layout/UserLayout";
import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useProfile from "@/src/react-query/useProfile";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import authClient from "@/src/utils/authClient";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { data: profile } = useProfile();

  return (
    <UserLayout title={`Lịch sử báo cáo của ${router?.query?.name}`}>
      <SalonReportHistory
        name={router.query?.name}
        useQuery={useSalonReportsHistory}
        userId={profile?._id}
      />
    </UserLayout>
  );
};

export default authClient(Page);
