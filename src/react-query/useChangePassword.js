import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
const changePassword = async (form) => {
  const res = await axiosInstance.post("api/user/changePassword", form);
  return res.data;
};

const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form) => changePassword(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("useProfile");
      toast.success(data?.msg);
      localStorage.setItem("token", data?.token);
    },
  });
};

export default useChangePassword;
