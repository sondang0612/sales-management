import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const deleteSalonReportById = async (id) => {
  const res = await axiosInstance.delete(`api/salonReport/${id}`);
  return res.data;
};

const useDeleteSalonReportById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSalonReportById(id),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || "Lỗi từ server");
    },
    onSuccess: async () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries(queryKeys.useMySalons);
      queryClient.invalidateQueries(queryKeys.useMySalonReports);
      queryClient.invalidateQueries(queryKeys.useSalonReportBySalon);
    },
  });
};

export default useDeleteSalonReportById;
