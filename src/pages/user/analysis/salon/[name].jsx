import SalonReportBySalonTable from "@/src/containers/private/SalonReportBySalonTable";
import useDeleteSalonReportById from "@/src/react-query/useDeleteSalonReportById";
import useSalonReportBySalon from "@/src/react-query/useSalonReportBySalon";
import authClient from "@/src/utils/authClient";
import { categories } from "@/src/utils/constants";
import { Space, Table } from "antd/lib/index";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { name, address, phone } = router.query;
  const [page, setPage] = React.useState(0);
  const { mutate: deleteSalonReportById } = useDeleteSalonReportById();
  const [columns] = React.useState([
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <p className="text-blue-500">{text}</p>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (_, record) => (
        <div className="overflow-hidden truncate w-[200px]">
          {record?.content}
        </div>
      ),
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
          className={`${categories[record.category].textColor} border ${
            categories[record.category].borderColor
          } ${
            categories[record.category].bgColor
          } inline-block px-2 py-1 rounded-md`}
        >
          {categories[record.category].text}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="hover:text-red-500 text-red-400"
            onClick={() => deleteSalonReportById(record._id)}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ]);
  const { data: salons } = useSalonReportBySalon({
    name,
    address,
    phone,
    page,
    size: 5,
  });
  const formatData = React.useMemo(() => {
    return salons?.salons?.map((salon) => ({
      ...salon,
      key: salon._id,
      createdAt: dayjs(salon.createdAt).format("DD/MM/YYYY"),
    }));
  }, [salons]);
  return (
    <SalonReportBySalonTable
      address={address}
      columns={columns}
      formatData={formatData}
      name={name}
      phone={phone}
      totalPages={salons?.totalPages}
      setPage={setPage}
    />
  );
};

export default authClient(Page);
