import SalonReportHistory from "@/src/containers/private/SalonReportHistory";
import useSalonReportsHistory from "@/src/react-query/useSalonReportsHistory";
import authClient from "@/src/utils/authClient";

const Page = () => {
  return (
    <SalonReportHistory
      useQuery={useSalonReportsHistory}
      title="Lịch sử báo cáo"
    />
  );
};

export default authClient(Page);
