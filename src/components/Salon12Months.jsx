import React from "react";
import useSalonReportAnalysisByName from "../react-query/useSalonReportAnalysisByName";
import Status from "./Status";

const Salon12Months = ({ name }) => {
  const { data: analysis } = useSalonReportAnalysisByName({ name });
  const getAnalysisByMonth = (month) => {
    return analysis
      ?.map((item) =>
        item._id.month === month
          ? { category: item?._id?.category, count: item.count }
          : undefined
      )
      .filter(Boolean);
  };
  return (
    <>
      {[...Array(12).keys()].map((_, index) => {
        const result = getAnalysisByMonth(index + 1);
        if (!result) return <td className="px-6 py-4" key={index} />;
        return (
          <td
            className={`px-6 py-4 text-center ${
              index % 2 === 0 ? "bg-blue-200" : ""
            }`}
            key={index}
          >
            {result?.map((item) => (
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
