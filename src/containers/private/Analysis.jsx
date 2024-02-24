import Salon12Months from "@/src/components/Salon12Months";
import React from "react";

const Analysis = ({ data }) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên Salon
              </th>
              {[...Array(12).keys()].map((item) => (
                <th scope="col" className="px-6 py-3" key={item}>
                  Tháng {item + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {item?.name}
                  </th>
                  <Salon12Months name={item?.name} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analysis;
