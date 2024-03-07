import AdminLayout from "@/src/components/layout/AdminLayout";
import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import useUser from "@/src/react-query/useUser";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { id: userId, name } = router.query;
  const { data: user } = useUser({ id: userId });
  return (
    <AdminLayout
      title={
        <h3 className="px-4 mb-7 text-2xl text-center">
          Lịch sử báo cáo của Sale&nbsp;
          <span className="underline text-blue-500 cursor-pointer">
            {user?.username || "Lorem"}
          </span>
          &nbsp;tại Salon&nbsp;
          <span className="underline text-blue-500 cursor-pointer">{name}</span>
        </h3>
      }
    >
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
