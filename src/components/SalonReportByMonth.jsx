import React from "react";
import useSalonAnalysisByNameAndMonthAtYear from "../react-query/useSalonAnalysisByNameAndMonthAtYear";
import Status from "./Status";

const SalonReportByMonth = ({ name, month, userId, year }) => {
  const { data: analysis } = useSalonAnalysisByNameAndMonthAtYear({
    name,
    month,
    userId,
    year,
  });
  return (
    <div>
      {analysis?.data?.map((item) => (
        <Status
          number={item?.count}
          category={item?._id?.category}
          key={item?._id?.category + name}
        />
      ))}
    </div>
  );
};

export default React.memo(SalonReportByMonth);
