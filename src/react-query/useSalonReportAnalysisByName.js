import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const getSalonReportAnalysisByName = async (name) => {
  const res = await axiosInstance.get(`api/salonReport/byName?name=${name}`);
  return res.data.data;
};

const useSalonReportAnalysisByName = ({ name }) => {
  return useQuery({
    queryKey: [queryKeys.useSalonReportAnalysisByName, { name }],
    queryFn: () => getSalonReportAnalysisByName(name),
    enabled: !!name,
  });
};

export default useSalonReportAnalysisByName;
