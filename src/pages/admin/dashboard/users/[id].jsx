import SalonAnalysis from "@/src/containers/private/SalonAnalysis";
import useSalonsByUserId from "@/src/react-query/useSalonsByUserId";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const { data: salonsByUserId } = useSalonsByUserId({
    page,
    size: 5,
    userId: router.query?.id,
  });
  return (
    <div>
      <SalonAnalysis
        page={page}
        data={salonsByUserId}
        setPage={setPage}
        userId={router.query?.id}
      />
    </div>
  );
};

export default authAdmin(Page);
