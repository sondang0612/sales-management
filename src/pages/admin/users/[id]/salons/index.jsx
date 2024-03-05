import AdminLayout from "@/src/components/layout/AdminLayout";
import SalonReportAnalysis from "@/src/containers/private/SalonReportAnalysis";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout title="Chi tiết Sales">
      <SalonReportAnalysis userId={id} isAdmin />
    </AdminLayout>
  );
};

export default authAdmin(Page);
