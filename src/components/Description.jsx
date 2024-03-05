import React from "react";

const Description = () => {
  return (
    <div className="mb-5 left-0 bg-white p-4 inline-flex rounded-md mx-5 gap-2 flex-col md:text-[14px] text-[8px]">
      <div className="flex flex-row items-center gap-1">
        <div className="size-[20px] bg-red-500 rounded-md" />
        <p className="text-black">Salon mới tiếp cận (Chưa có account)</p>
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="size-[20px] bg-yellow-500 rounded-md" />
        <p className="text-black">Salon mới(Chăm sóc lại)</p>
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="size-[20px] bg-green-500 rounded-md" />
        <p className="text-black">Chăm sóc đã có account</p>
      </div>
    </div>
  );
};

export default React.memo(Description);
