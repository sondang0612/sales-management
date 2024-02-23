import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getMySalonReport = async () => {
  const res = await axiosInstance.get("api/salonReport");
  return res.data.data;
};

const useMySalonReports = () => {
  return useQuery({
    queryKey: [queryKeys.useMySalonReports],
    queryFn: getMySalonReport,
  });
};

export default useMySalonReports;
