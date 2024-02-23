import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalons = async ({ page, size }) => {
  const res = await axiosInstance.get(
    `api/user/mySalons?page=${page}&size=${size}`
  );
  return res.data.data;
};

const useMySalons = ({ page, size }) => {
  return useQuery({
    queryKey: [queryKeys.useMySalons, { page, size }],
    queryFn: () => getSalons({ page, size }),
  });
};

export default useMySalons;
