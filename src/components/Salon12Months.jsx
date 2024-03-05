import React from "react";
import useSalonReportAnalysisByName from "../react-query/useSalonReportAnalysisByName";
import Status from "./Status";

const Salon12Months = ({ name, userId, year }) => {
  const { data: analysis } = useSalonReportAnalysisByName({
    name,
    userId,
    year,
  });
  const formatDataByMonth = (month) => {
    return analysis
      ?.map((item) =>
        item._id.month === month
          ? { count: item.count, category: item._id.category }
          : undefined
      )
      .filter(Boolean);
  };

  return (
    <>
      {[...Array(12).keys()].map((_, index) => {
        if (!analysis)
          return (
            <td
              className={`px-6 py-4 ${index % 2 === 0 ? "bg-blue-200" : ""}`}
              key={index}
            />
          );
        return (
          <td
            className={`px-6 py-4 text-center ${
              index % 2 === 0 ? "bg-blue-200" : ""
            }`}
            key={index}
          >
            {formatDataByMonth(index + 1)?.map((item) => (
              <Status
                number={item.count}
                category={item.category}
                key={item.category + name}
              />
            ))}
          </td>
        );
      })}
    </>
  );
};

export default Salon12Months;
