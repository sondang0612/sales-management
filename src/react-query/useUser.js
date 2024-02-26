import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getUser = async ({ id }) => {
  const res = await axiosInstance.get(`api/user/${id}`);
  return res.data.data;
};

const useUser = ({ id }) => {
  return useQuery({
    queryKey: [queryKeys.useUser, id],
    queryFn: () => getUser({ id }),
    enabled: !!id,
  });
};

export default useUser;
