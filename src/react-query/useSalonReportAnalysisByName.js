import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportAnalysisByName = async (name, userId, year) => {
  const res = await axiosInstance.get(
    `api/salonReport/byName?name=${name}&year=${year}${
      userId ? `&userId=${userId}` : ""
    }`
  );
  return res.data.data;
};

const useSalonReportAnalysisByName = ({ name, userId, year }) => {
  return useQuery({
    queryKey: [queryKeys.useSalonReportAnalysisByName, { name, userId, year }],
    queryFn: () => getSalonReportAnalysisByName(name, userId, year),
    enabled: !!name,
  });
};

export default useSalonReportAnalysisByName;
