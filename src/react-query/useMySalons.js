import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalons = async ({ page, size, searchText }) => {
  const res = await axiosInstance.get(
    `api/user/mySalons?page=${page}&size=${size}&searchText=${searchText}`
  );
  return res.data.data;
};

const useMySalons = ({ page, size, searchText }) => {
  return useQuery({
    queryKey: [queryKeys.useMySalons, { page, size, searchText }],
    queryFn: () => getSalons({ page, size, searchText }),
  });
};

export default useMySalons;
