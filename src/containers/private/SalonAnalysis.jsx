import Salon12Months from "@/src/components/Salon12Months";
import pathNames from "@/src/utils/pathNames";
import { Input } from "antd/lib/index";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const { Search } = Input;
const SalonAnalysis = ({
  data,
  page,
  setPage,
  userId,
  setSearchText,
  setYear,
  year,
  role = "USER",
}) => {
  const router = useRouter();
  return (
    <>
      <div className="py-[10px]">
        <div className="flex items-center mb-1 gap-2">
          <div className="w-1/3">
            <Search
              placeholder="Nhập tên salon tìm kiếm"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={setSearchText}
            />
          </div>
          <select
            className={`border border-gray-500 w-1/6 text-sm rounded-lg block p-1.5 text-[14px] text-black`}
            onChange={(e) => setYear(e.target.value)}
            defaultValue={"2024"}
          >
            {[...Array(10).keys()].map((item) => (
              <option
                value={`${2023 + item}`}
                key={`${2023 + item}`}
                className="text-black"
              >
                {2023 + item}
              </option>
            ))}
          </select>
        </div>
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    key={index}
                    onClick={() => {
                      if (item) {
                        router.push({
                          pathname: `${
                            role === "USER"
                              ? pathNames.USER_SALONS
                              : `${pathNames.ADMIN_DASHBOARD_USERS}/${userId}/salons`
                          }/${item?.name}`,
                          query: {
                            phone: item?.phone,
                            address: item?.address,
                          },
                        });
                      }
                    }}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {item?.name?.length > 15
                        ? `${item?.name?.slice(0, 15)}...`
                        : item?.name}
                    </th>
                    <Salon12Months
                      name={item?.name}
                      userId={userId}
                      year={year}
                    />
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
      <div className="float-left mb-5 left-0 bg-white p-4 inline-flex rounded-md mx-5 gap-2 flex-col md:text-[14px] text-[8px]">
        <div className="flex flex-row items-center gap-1">
          <div className="size-[20px] bg-red-500 rounded-md" />
          <p className="text-black">Salon mới tiếp cận (Chưa có account)</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="size-[20px] bg-yellow-500 rounded-md" />
          <p className="text-black">Salon mới(Chăm sóc lại)</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="size-[20px] bg-green-500 rounded-md" />
          <p className="text-black">Chăm sóc đã có account</p>
        </div>
      </div>
    </>
  );
};

export default SalonAnalysis;
