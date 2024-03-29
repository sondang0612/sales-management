import React from "react";
const COLORS = {
  "no-account": "bg-red-500",
  "re-take-care-no-account": "bg-yellow-500",
  "re-take-care-have-account": "bg-green-500",
};
const Status = ({ number, category }) => {
  return (
    <span className={`px-3 rounded-md text-white ${COLORS[category]} ml-1`}>
      {number}
    </span>
  );
};

export default Status;
