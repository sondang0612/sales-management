import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import queryKeys from "./queryKeys";
const queryFn = async ({ name, userId, year, month }) => {
  const res = await axiosInstance.get(
    `api/salonReport/monthAtYear?month=${month}&year=${year}&name=${name}&userId=${userId}`
  );
  return res.data.data;
};

const useSalonAnalysisByNameAndMonthAtYear = ({
  name,
  userId,
  year,
  month,
}) => {
  return useQuery({
    queryKey: [
      queryKeys.useSalonReportAnalysisByName,
      { name, userId, year, month },
    ],
    queryFn: () => queryFn({ name, userId, year, month }),
    enabled: !!name,
  });
};

export default useSalonAnalysisByNameAndMonthAtYear;
