import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
const login = async (form) => {
  const res = await axiosInstance.post("api/user/login", form);
  return res.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: (form) => login(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      toast.success(data?.msg);
      localStorage.setItem("token", data.token);
      window.location.href = "auth/user/main";
    },
  });
};

export default useLogin;
