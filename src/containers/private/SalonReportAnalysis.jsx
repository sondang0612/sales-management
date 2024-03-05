import SalonReportByMonth from "@/src/components/SalonReportByMonth";
import { SIZE } from "@/src/constant";
import useSalonsByUserId from "@/src/react-query/useSalonsByUserId";
import pathNames from "@/src/constant/pathNames";
import { Input, Row, Select, Table } from "antd/lib/index";
import { useRouter } from "next/navigation";

import React from "react";
import Description from "@/src/components/Description";
const SalonReportAnalysis = ({ userId, isAdmin }) => {
  const [searchText, setSearchText] = React.useState("");
  const [year, setYear] = React.useState("2024");
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const { data: mySalons } = useSalonsByUserId({
    page: page,
    size: SIZE,
    year,
    page,
    searchText,
    userId,
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
              userId={userId}
              year={year}
            />
          );
        },
      })),
    ];
  }, [userId, year]);

  return (
    <>
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
        pagination={{
          pageSize: SIZE,
          total: mySalons?.totalPages * SIZE,
          onChange: (page) => {
            setPage(page - 1);
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(
                isAdmin
                  ? `${pathNames.ADMIN_USERS}/${userId}/salons/${record.name}`
                  : `${pathNames.USER_SALONS}/${record.name}`
              );
            },
          };
        }}
      />
      <Description />
    </>
  );
};

export default SalonReportAnalysis;
