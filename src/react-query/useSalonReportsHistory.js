import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportsHistory = async ({ page, userId, from, to, name }) => {
  const res = await axiosInstance.get(
    `api/salonReport/history?page=${page}&userId=${userId}&from=${from}&to=${to}&name=${name}`
  );
  return res.data.data;
};

const useSalonReportsHistory = ({ page, userId, from, to, name }) => {
  return useQuery({
    queryKey: [
      queryKeys.useSalonReportsHistory,
      { page, userId, from, to, name },
    ],
    queryFn: () => getSalonReportsHistory({ page, userId, from, to, name }),
    enabled: !!userId,
  });
};

export default useSalonReportsHistory;
