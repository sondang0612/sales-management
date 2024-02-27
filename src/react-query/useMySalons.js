import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalons = async ({ page, size, searchText, year }) => {
  const res = await axiosInstance.get(
    `api/user/mySalons?page=${page}&size=${size}&searchText=${searchText}&year=${year}`
  );
  return res.data.data;
};

const useMySalons = ({ page, size, searchText, year }) => {
  return useQuery({
    queryKey: [queryKeys.useMySalons, { page, size, searchText, year }],
    queryFn: () => getSalons({ page, size, searchText, year }),
  });
};

export default useMySalons;
