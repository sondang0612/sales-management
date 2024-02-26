import authAdmin from "@/src/utils/authAdmin";
import React from "react";

const Main = () => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold text-black">1000</p>
          <p className="text-gray-600">Tổng Salon mới (chăm sóc lại)</p>
        </div>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">500</p>
          <p className="text-gray-600">Tổng chăm sóc (đã có account)</p>
        </div>
      </div>
    </div>
  );
};

export default authAdmin(Main);
