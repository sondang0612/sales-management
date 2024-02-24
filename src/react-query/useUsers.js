import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getUsers = async ({ page, size }) => {
  const res = await axiosInstance.get(
    `api/admin/getUsers?page=${page}&size=${size}`
  );
  return res.data.data;
};

const useUsers = ({ page, size }) => {
  return useQuery({
    queryKey: [queryKeys.useUsers, { page, size }],
    queryFn: () => getUsers({ page, size }),
  });
};

export default useUsers;
