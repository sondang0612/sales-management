import SalonAnalysis from "@/src/containers/private/SalonAnalysis";
import useSalonsByUserId from "@/src/react-query/useSalonsByUserId";
import useUser from "@/src/react-query/useUser";
import authAdmin from "@/src/utils/authAdmin";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const { data: user } = useUser({ id: router.query?.id });
  const [year, setYear] = React.useState("2024");

  const { data: salonsByUserId } = useSalonsByUserId({
    page,
    size: 5,
    userId: router.query?.id,
    searchText,
    year,
  });
  return (
    <div>
      <h3 className="text-[24px] font-bold">
        Tên Sale: {user?.username} ({user?.phone})
      </h3>
      <SalonAnalysis
        page={page}
        data={salonsByUserId}
        setPage={setPage}
        userId={router.query?.id}
        setSearchText={setSearchText}
        setYear={setYear}
        year={year}
        role="ADMIN"
      />
    </div>
  );
};

export default authAdmin(Page);
