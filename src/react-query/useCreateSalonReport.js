import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
const createSalon = async (form) => {
  const res = await axiosInstance.post("api/salonReport", form);
  return res.data;
};

const useCreateSalonReport = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form) => createSalon(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("useMySalons");
      toast.success(data?.msg);
      onSuccess();
    },
  });
};

export default useCreateSalonReport;
