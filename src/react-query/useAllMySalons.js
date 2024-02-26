import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalons = async () => {
  const res = await axiosInstance.get(`api/user/salons`);
  return res.data.data;
};

const useAllMySalons = () => {
  return useQuery({
    queryKey: [queryKeys.useAllMySalons],
    queryFn: () => getSalons(),
  });
};

export default useAllMySalons;
