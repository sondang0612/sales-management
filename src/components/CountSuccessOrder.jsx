import React from "react";
import useCountSuccessOrderByUserId from "../react-query/useCountSuccessOrdersByUserId";
import { Spin } from "antd/lib/index";

const CountSuccessOrder = ({ userId }) => {
  const { data: count, isPending } = useCountSuccessOrderByUserId({ userId });
  return !isPending ? <div>{count?.data}</div> : <Spin size="small" />;
};

export default React.memo(CountSuccessOrder);
