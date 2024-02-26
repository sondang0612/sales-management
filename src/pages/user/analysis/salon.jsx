import SalonAnalysis from "@/src/containers/private/SalonAnalysis";
import useMySalons from "@/src/react-query/useMySalons";
import authClient from "@/src/utils/authClient";
import React from "react";

const AnalysisPage = () => {
  const [page, setPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const { data: mySalons } = useMySalons({ page, size: 5, searchText });

  return (
    <>
      <SalonAnalysis
        data={mySalons}
        page={page}
        setPage={setPage}
        setSearchText={setSearchText}
      />
    </>
  );
};

export default authClient(React.memo(AnalysisPage));
