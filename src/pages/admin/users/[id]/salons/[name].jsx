import AdminLayout from "@/src/components/layout/AdminLayout";
import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { id: userId, name } = router.query;
  return (
    <AdminLayout title={`Lịch sử báo cáo ${name}`}>
      <SalonReportHistory
        name={name}
        useQuery={useSalonReportsHistory}
        userId={userId}
        isDelete={false}
      />
    </AdminLayout>
  );
};

export default authAdmin(Page);
