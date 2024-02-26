import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import pathNames from "../utils/pathNames";
const register = async (form) => {
  const res = await axiosInstance.post("api/user/register", form);
  return res.data;
};

const useRegister = () => {
  return useMutation({
    mutationFn: (form) => register(form),
    onError: (error) => {
      const msg =
        error?.response?.data?.msg || error?.response?.data || "Lỗi từ server";
      if (msg.includes("phone")) {
        toast.error("Số điện thoại chỉ 11 số");
      } else {
        toast.error(msg);
      }
    },
    onSuccess: async (data) => {
      toast.success(data?.msg);
      localStorage.setItem("token", data.token);
      window.location.href = pathNames.USER_CREATE_FORM;
    },
  });
};

export default useRegister;
