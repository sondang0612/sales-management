import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const countSuccessOrderByUserId = async (userId) => {
  const res = await axiosInstance.get(
    `api/salonReport/count-success?userId=${userId}`
  );
  console.log(userId);
  return res.data;
};

const useCountSuccessOrderByUserId = ({ userId }) => {
  return useQuery({
    queryFn: () => countSuccessOrderByUserId(userId),
    queryKey: [queryKeys.useCountSuccessOrderByUserId, { userId }],
  });
};

export default useCountSuccessOrderByUserId;
