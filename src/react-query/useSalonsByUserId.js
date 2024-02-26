import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonsByUserId = async ({ page, size, userId, searchText }) => {
  const res = await axiosInstance.get(
    `api/admin/analysis/salons?page=${page}&size=${size}&userId=${userId}&searchText=${searchText}`
  );
  return res.data.data;
};

const useSalonsByUserId = ({ page, size, userId, searchText }) => {
  return useQuery({
    queryKey: [queryKeys.useSalonsByUserId, { page, size, userId, searchText }],
    queryFn: () => getSalonsByUserId({ page, size, userId, searchText }),
    enabled: !!userId,
  });
};

export default useSalonsByUserId;
