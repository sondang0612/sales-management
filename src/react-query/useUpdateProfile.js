import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
const updateProfile = async (form) => {
  const res = await axiosInstance.post("api/user", form);
  return res.data;
};

const useUpdateProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form) => updateProfile(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("useProfile");
      toast.success(data?.msg);
      localStorage.setItem("token", data?.token);
      onSuccess();
    },
  });
};

export default useUpdateProfile;
