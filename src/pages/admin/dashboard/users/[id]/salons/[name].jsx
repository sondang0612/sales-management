import SalonReportBySalonTable from "@/src/containers/private/SalonReportBySalonTable";
import useSalonReportBySalonAndUserId from "@/src/react-query/useSalonReportBySalon copy";
import authAdmin from "@/src/utils/authAdmin";
import { categories } from "@/src/utils/constants";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();

  const { name, id: userId, phone, address } = router.query;
  const [page, setPage] = React.useState(0);
  const { data: salons } = useSalonReportBySalonAndUserId({
    address,
    name,
    page: page,
    phone,
    size: 5,
    id: userId,
  });
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
  ]);
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

export default authAdmin(Page);
