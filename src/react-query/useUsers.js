import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getUsers = async ({ page, size, sortBy }) => {
  const res = await axiosInstance.get(
    `api/admin/getUsers?page=${page}&size=${size}&sortBy=${sortBy}`
  );
  return res.data.data;
};

const useUsers = ({ page, size, sortBy = "newest" }) => {
  return useQuery({
    queryKey: [queryKeys.useUsers, { page, size, sortBy }],
    queryFn: () => getUsers({ page, size, sortBy }),
  });
};

export default useUsers;
