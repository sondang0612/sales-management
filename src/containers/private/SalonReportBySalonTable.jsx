import { Table } from "antd/lib/index";
import React from "react";

const SalonReportBySalonTable = ({
  formatData,
  columns,
  name,
  address,
  phone,
  totalPages,
  setPage,
}) => {
  return (
    <div className="p-5">
      <div className="flex text-center mb-5 flex-col">
        <p className="text-black md:text-[24px]">
          Chi tiết báo cáo tại Salon {name} (SĐT: {phone})
        </p>
        <p className="text-black font-medium">(Địa chỉ: {address})</p>
      </div>
      <div className="bg-white">
        <Table
          tableLayout="fixed"
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={formatData}
          pagination={{
            style: { marginRight: 10 },
            pageSize: 5,
            total: totalPages,
            onChange: (page) => {
              setPage(page - 1);
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalonReportBySalonTable;
