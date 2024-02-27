import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportBySalonAndUserId = async ({
  name,
  id,
  phone,
  address,
  page,
  size,
}) => {
  const res = await axiosInstance.get(
    `api/admin/analysis/users/${id}/salons/${name}?phone=${phone}&address=${address}&page=${page}&size=${size}`
  );

  return res.data.data;
};

const useSalonReportBySalonAndUserId = ({
  name,
  phone,
  address,
  page,
  size,
  id,
}) => {
  return useQuery({
    queryKey: [
      queryKeys.useSalonReportBySalonAndUserId,
      { name, phone, id, address, page, size },
    ],
    queryFn: () =>
      getSalonReportBySalonAndUserId({ name, phone, id, address, page, size }),
    enabled: !!name,
  });
};

export default useSalonReportBySalonAndUserId;
