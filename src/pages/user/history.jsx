import UserLayout from "@/src/components/layout/UserLayout";
import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useProfile from "@/src/react-query/useProfile";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import authClient from "@/src/utils/authClient";

const Page = () => {
  const { data: profile } = useProfile();
  return (
    <UserLayout title={"Nhập báo cáo"}>
      <SalonReportHistory
        useQuery={useSalonReportsHistory}
        title="Lịch sử báo cáo"
        userId={profile?._id}
      />
    </UserLayout>
  );
};

export default authClient(Page);
