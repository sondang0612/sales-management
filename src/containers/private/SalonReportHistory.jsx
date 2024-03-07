import { CATEGORIES, SIZE } from "@/src/constant";
import useDeleteSalonReportById from "@/src/react-query/useDeleteSalonReportById";
import { Image, Modal, Row, Select, Table } from "antd/lib/index";
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";
const SalonReportHistory = ({ useQuery, name, userId, isDelete = true }) => {
  const [page, setPage] = React.useState(0);
  const { mutate: deleteSalonById } = useDeleteSalonReportById({
    onSuccess: () => {
      toast.success("Xóa thành công!!!");
    },
  });
  const [dateFrom, setDateFrom] = React.useState(undefined);
  const [dateTo, setDateTo] = React.useState(undefined);
  const [filterValue, setFilterValue] = React.useState("all");
  const { data: salonReports, isPending: isPendingQuery } = useQuery({
    page,
    userId,
    from: dateFrom,
    to: dateTo,
    name,
  });
  const [columns] = React.useState([
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <p className="text-blue-500">{text}</p>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Loại",
      key: "category",
      dataIndex: "category",
      render: (_, record) => (
        <div
          className={`${CATEGORIES[record.category].textColor} border ${
            CATEGORIES[record.category].borderColor
          } ${
            CATEGORIES[record.category].bgColor
          } inline-block px-2 py-1 rounded-md`}
        >
          {CATEGORIES[record.category].text}
        </div>
      ),
    },
    isDelete
      ? {
          title: "Hành động",
          dataIndex: "",
          key: "x",
          render: (record) => (
            <a
              className="text-red-500 hover:text-red-500 underline"
              onClick={() => {
                deleteSalonById(record._id);
                toast.success("Xóa");
              }}
            >
              Xóa
            </a>
          ),
        }
      : {},
  ]);
  const [openModal, setOpenModal] = React.useState(false);

  const [selectedSalon, setSelectedSalon] = React.useState(null);
  const onRowClick = (salon) => {
    setSelectedSalon(salon);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setSelectedSalon(null);
  };

  const formatData = React.useMemo(() => {
    return salonReports?.data?.map((salon) => ({
      ...salon,
      key: salon._id,
      createdAt: dayjs(salon.createdAt).format("DD/MM/YYYY"),
    }));
  }, [salonReports]);

  React.useEffect(() => {
    if (filterValue === "all") {
      setDateFrom(undefined);
      setDateTo(undefined);
    } else if (filterValue === "today") {
      setDateFrom(dayjs().format("YYYY-MM-DD"));
      setDateTo(dayjs().format("YYYY-MM-DD"));
    } else if (filterValue === "last_day") {
      setDateFrom(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
      setDateTo(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
    }
  }, [filterValue]);

  return (
    <>
      <Select
        className="w-[20%] mb-2"
        value={filterValue}
        onChange={setFilterValue}
      >
        <Select.Option value="all">Tất cả</Select.Option>
        <Select.Option value="today">Hôm nay</Select.Option>
        <Select.Option value="last_day">Hôm qua</Select.Option>
      </Select>
      <Table
        loading={isPendingQuery}
        dataSource={formatData}
        columns={columns}
        className="RCM_two_level_table1"
        pagination={{
          pageSize: SIZE,
          total: salonReports?.totalPages * SIZE,
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
              <Image
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

export default SalonReportHistory;
