import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportAnalysisByName = async (name, userId) => {
  const res = await axiosInstance.get(
    `api/salonReport/byName?name=${name}${userId ? `&userId=${userId}` : ""}`
  );
  return res.data.data;
};

const useSalonReportAnalysisByName = ({ name, userId }) => {
  return useQuery({
    queryKey: [queryKeys.useSalonReportAnalysisByName, { name, userId }],
    queryFn: () => getSalonReportAnalysisByName(name, userId),
    enabled: !!name,
  });
};

export default useSalonReportAnalysisByName;
