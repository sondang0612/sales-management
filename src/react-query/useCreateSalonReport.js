import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const createSalon = async (form) => {
  const res = await axiosInstance.post("api/salonReport", form);
  return res.data;
};

const useCreateSalonReport = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form) => createSalon(form),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries(queryKeys.useSalonsByUserId);
      toast.success(data?.msg);
      onSuccess();
    },
    onError: () => {
      toast.error("Lỗi từ server");
      onError && onError();
    },
  });
};

export default useCreateSalonReport;
