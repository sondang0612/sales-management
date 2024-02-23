import useMySalonReports from "@/src/react-query/useMySalonReports";
import authClient from "@/src/utils/authClient";
import React from "react";

const Analysis = () => {
  const { data: mySalonReports } = useMySalonReports();
  console.log(mySalonReports);
  return <div>analysis</div>;
};

export default authClient(Analysis);
