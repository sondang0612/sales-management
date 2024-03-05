import SalonAnalysis from "@/src/containers/private/SalonAnalysis";
import useMySalons from "@/src/react-query/useMySalons";
import authClient from "@/src/utils/authClient";
import React from "react";

const AnalysisPage = () => {
  const [page, setPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [year, setYear] = React.useState("2024");
  const { data: mySalons } = useMySalons({ page, size: 5, searchText, year });
  return (
    <>
      <SalonAnalysis
        data={mySalons}
        page={page}
        setPage={setPage}
        setSearchText={setSearchText}
        setYear={setYear}
        year={year}
      />
    </>
  );
};

export default authClient(React.memo(AnalysisPage));
