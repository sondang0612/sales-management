import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getProfile = async () => {
  const res = await axiosInstance.get("api/user");
  return res.data.data;
};

const useProfile = () => {
  return useQuery({
    queryKey: [queryKeys.useProfile],
    queryFn: getProfile,
  });
};

export default useProfile;
