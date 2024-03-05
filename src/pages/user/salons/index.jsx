import SalonReportByMonth from "@/src/components/SalonReportByMonth";
import UserLayout from "@/src/components/layout/UserLayout";
import { SIZE } from "@/src/constant";
import useMySalons from "@/src/react-query/useMySalons";
import useProfile from "@/src/react-query/useProfile";
import authClient from "@/src/utils/authClient";
import { Input, Row, Select, Space, Table } from "antd/lib/index";
import Column from "antd/lib/table/Column";
import { useRouter } from "next/navigation";

import React from "react";
const Page = () => {
  const [searchText, setSearchText] = React.useState("");
  const { data: profile } = useProfile();
  const [year, setYear] = React.useState("2024");
  const router = useRouter();
  const { data: mySalons } = useMySalons({
    page: 0,
    size: SIZE,
    year,
    searchText,
  });

  const formatData = React.useMemo(() => {
    return mySalons?.salons?.map((item) => ({
      name: item?.name,
      key: item?.name,
      ...item,
    }));
  }, [mySalons]);

  const columns = React.useMemo(() => {
    return [
      {
        title: "Tên Salon",
        dataIndex: "name",
        key: "name",
      },
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        title: `T${item + 1}`,
        dataIndex: `T${item + 1}`,
        key: `T${item + 1}`,
        render: (_, record) => {
          return (
            <SalonReportByMonth
              name={record?.name}
              month={item + 1}
              userId={profile?._id}
              year={year}
            />
          );
        },
      })),
    ];
  }, [profile, year]);

  return (
    <UserLayout title={"Thống kê (Tháng)"}>
      <Row>
        <Input
          className="rounded-md w-1/5 mb-2"
          placeholder="Nhập tên..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select className="w-1/5 mb-2 ml-2" onChange={setYear} value={year}>
          {[...Array(10).keys()].map((item) => (
            <Select.Option value={`${item + 2023}`} key={item}>
              {item + 2023}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <Table
        className="RCM_two_level_table1"
        dataSource={formatData}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/user/salons/${record.name}`);
            },
          };
        }}
      />
    </UserLayout>
  );
};

export default authClient(Page);
