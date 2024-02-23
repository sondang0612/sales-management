import Analysis from "@/src/containers/private/Analysis";
import useMySalons from "@/src/react-query/useMySalons";
import authClient from "@/src/utils/authClient";
import React from "react";

const AnalysisPage = () => {
  const { data: mySalons } = useMySalons({ page: 0, size: 10 });

  return (
    <div>
      <Analysis data={mySalons} />
    </div>
  );
};

export default authClient(React.memo(AnalysisPage));
