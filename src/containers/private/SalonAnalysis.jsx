import Salon12Months from "@/src/components/Salon12Months";
import React from "react";

const SalonAnalysis = ({ data, page, setPage, userId }) => {
  return (
    <div className="py-[10px]">
      <h3 className="text-2xl font-bold text-center mb-[10px]">Thống kê</h3>
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
            {data?.salons &&
              data?.salons?.map((item, index) => (
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
                  <Salon12Months name={item?.name} userId={userId} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center flex-col mt-[10px]">
        <span className="text-white">
          {page + 1}/{data?.totalPages}
        </span>
        <div className="flex items-center justify-center">
          <a
            onClick={() => {
              if (page !== 0) {
                setPage(page - 1);
              } else {
                toast.error("Vượt quá trang");
              }
            }}
            href="#"
            className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Lui
          </a>
          <a
            onClick={() => {
              if (page < data?.totalPages - 1) {
                setPage(page + 1);
              } else {
                toast.error("Vượt quá trang");
              }
            }}
            href="#"
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Tiếp
          </a>
        </div>
      </div>
    </div>
  );
};

export default SalonAnalysis;
