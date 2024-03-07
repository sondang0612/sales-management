import React from "react";
import useCountSuccessOrderByUserId from "../react-query/useCountSuccessOrdersByUserId";

const CountSuccessOrder = ({ userId }) => {
  const { data: count } = useCountSuccessOrderByUserId({ userId });
  return <div>{count?.data}</div>;
};

export default React.memo(CountSuccessOrder);
