import UserLayout from "@/src/components/layout/UserLayout";
import SalonReportAnalysis from "@/src/containers/private/SalonReportAnalysis";
import useProfile from "@/src/react-query/useProfile";
import authClient from "@/src/utils/authClient";

const Page = () => {
  const { data: profile } = useProfile();

  return (
    <UserLayout title={"Thống kê (Tháng)"}>
      <SalonReportAnalysis userId={profile?._id} />
    </UserLayout>
  );
};

export default authClient(Page);
