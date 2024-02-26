import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonsByUserId = async ({ page, size, userId }) => {
  const res = await axiosInstance.get(
    `api/admin/analysis/salons?page=${page}&size=${size}&userId=${userId}`
  );
  return res.data.data;
};

const useSalonsByUserId = ({ page, size, userId }) => {
  return useQuery({
    queryKey: [queryKeys.useSalonsByUserId, { page, size, userId }],
    queryFn: () => getSalonsByUserId({ page, size, userId }),
    enabled: !!userId,
  });
};

export default useSalonsByUserId;
