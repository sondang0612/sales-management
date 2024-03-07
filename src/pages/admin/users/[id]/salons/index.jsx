import AdminLayout from "@/src/components/layout/AdminLayout";
import SalonReportAnalysis from "@/src/containers/private/SalonReportAnalysis";
import useUser from "@/src/react-query/useUser";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user } = useUser({ id });
  return (
    <AdminLayout
      title={
        <>
          <h3 className="px-4 mb-7 text-2xl text-center">
            Danh sách Salon của Sale&nbsp;
            <span className="underline text-blue-500 cursor-pointer">
              {user?.username || "Lorem"}
            </span>
          </h3>
        </>
      }
    >
      <SalonReportAnalysis userId={id} isAdmin />
    </AdminLayout>
  );
};

export default authAdmin(Page);
