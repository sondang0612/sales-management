import UserLayout from "@/src/components/layout/UserLayout";
import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import authClient from "@/src/utils/authClient";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <SalonReportHistory
      name={router.query?.name}
      useQuery={useSalonReportsHistory}
      title="Lịch sử báo cáo"
    />
  );
};

export default authClient(Page);
