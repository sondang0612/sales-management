import React from "react";
import useSalonReportAnalysisByName from "../react-query/useSalonReportAnalysisByName";
import Status from "./Status";

const Salon12Months = ({ name }) => {
  const { data: analysis } = useSalonReportAnalysisByName({ name });
  console.log(analysis);
  return (
    <>
      {[...Array(12).keys()].map((_, index) => {
        if (!analysis) return <td className="px-6 py-4" key={index} />;
        return (
          <td
            className={`px-6 py-4 text-center ${
              index % 2 === 0 ? "bg-blue-200" : ""
            }`}
            key={index}
          >
            {analysis?.map((item) => (
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
