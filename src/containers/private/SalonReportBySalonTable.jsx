/* eslint-disable @next/next/no-img-element */
import { Modal, Row, Table } from "antd/lib/index";
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
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedSalon, setSelectedSalon] = React.useState(null);
  const onRowClick = (salon) => {
    console.log(salon);
    setSelectedSalon(salon);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setSelectedSalon(null);
  };
  return (
    <>
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
            rowClassName="cursor-pointer"
            pagination={{
              style: { marginRight: 10 },
              pageSize: 5,
              total: totalPages * 5,
              onChange: (page) => {
                setPage(page - 1);
              },
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  onRowClick(record);
                },
              };
            }}
          />
        </div>
      </div>
      <Modal
        title="Chi tiết báo cáo"
        tit
        open={openModal}
        onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Row gutter={24}>
          <p className="font-bold flex-1">ID Đơn Hàng:</p>
          <p className="text-blue-500 underline cursor-pointer flex-[3.5]">
            {selectedSalon?._id}
          </p>
        </Row>
        <Row gutter={24} className="mt-4">
          <p className="font-bold flex-1">Mô tả:</p>
          <p className="flex-[3.5]">{selectedSalon?.content}</p>
        </Row>
        <Row gutter={24} className="mt-4">
          <p className="font-bold flex-1">Ngày tạo:</p>
          <p className="flex-[3.5]">{selectedSalon?.createdAt}</p>
        </Row>
        <Row gutter={24} className="mt-4">
          <p className="font-bold flex-1">Ảnh kệ:</p>
          <div className="flex-[3.5] grid grid-cols-3 gap-2">
            {selectedSalon?.images?.map((item) => (
              <img
                src={item}
                alt={item}
                key={item}
                className="w-full rounded-md h-[150px]"
              />
            ))}
          </div>
        </Row>
      </Modal>
    </>
  );
};

export default SalonReportBySalonTable;
