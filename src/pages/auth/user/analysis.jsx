import Analysis from "@/src/containers/private/Analysis";
import useMySalons from "@/src/react-query/useMySalons";
import authClient from "@/src/utils/authClient";
import React from "react";
import toast from "react-hot-toast";

const AnalysisPage = () => {
  const [page, setPage] = React.useState(0);
  const { data: mySalons } = useMySalons({ page, size: 5 });
  return (
    <div>
      <Analysis data={mySalons?.salons} />
      <div className="flex items-center justify-center flex-col mt-[10px]">
        <span className="text-white">
          {page + 1}/{mySalons?.totalPages}
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
              if (page < mySalons?.totalPages - 1) {
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

export default authClient(React.memo(AnalysisPage));
