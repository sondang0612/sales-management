import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
const loginAdmin = async (form) => {
  const res = await axiosInstance.post("api/admin/login", form);
  return res.data;
};

const useLoginAdmin = () => {
  return useMutation({
    mutationFn: (form) => loginAdmin(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      toast.success(data?.msg);
      localStorage.setItem("token-admin", data.token);
      window.location.href = "dashboard/main";
    },
  });
};

export default useLoginAdmin;
