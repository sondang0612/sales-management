import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportBySalon = async ({ name, phone, address, page, size }) => {
  const res = await axiosInstance.get(
    `api/user/salons/${name}?phone=${phone}&address=${address}&page=${page}&size=${size}`
  );

  return res.data.data;
};

const useSalonReportBySalon = ({ name, phone, address, page, size }) => {
  return useQuery({
    queryKey: [
      queryKeys.useSalonReportBySalon,
      { name, phone, address, page, size },
    ],
    queryFn: () => getSalonReportBySalon({ name, phone, address, page, size }),
    enabled: !!name,
  });
};

export default useSalonReportBySalon;
