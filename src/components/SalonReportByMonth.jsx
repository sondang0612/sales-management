import React from "react";
import useSalonAnalysisByNameAndMonthAtYear from "../react-query/useSalonAnalysisByNameAndMonthAtYear";
import Status from "./Status";
import { Spin } from "antd/lib/index";

const SalonReportByMonth = ({ name, month, userId, year }) => {
  const { data: analysis, isPending } = useSalonAnalysisByNameAndMonthAtYear({
    name,
    month,
    userId,
    year,
  });
  return !isPending ? (
    <div>
      {analysis?.data?.map((item) => (
        <Status
          number={item?.count}
          category={item?._id?.category}
          key={item?._id?.category + name}
        />
      ))}
    </div>
  ) : (
    <Spin size="small" />
  );
};

export default React.memo(SalonReportByMonth);
