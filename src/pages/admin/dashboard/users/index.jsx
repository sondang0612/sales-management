import Sidebar from "@/src/containers/private/admin/Sidebar";
import useUsers from "@/src/react-query/useUsers";
import authAdmin from "@/src/utils/authAdmin";
import pathNames from "@/src/utils/pathNames";
import { Select, Table } from "antd/lib/index";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => {
      return <p className="text-blue-500 cursor-pointer">{text}</p>;
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Số lượng ra đơn",
    dataIndex: "countOrders",
    key: "countOrders",
  },
  {
    title: "Ngày tạo Tài khoản",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a className="text-red-500 hover:text-red-500">Delete</a>,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys`);
  },
  // getCheckboxProps: (record) => ({
  //   disabled: record.name === "Disabled User", // Column configuration not to be checked
  //   name: record.name,
  // }),
};

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [filter, setFilter] = React.useState("newest");
  const { data: usersPage } = useUsers({ page, size: 5, sortBy: filter });
  const router = useRouter();
  const formatData = React.useMemo(() => {
    return usersPage?.users?.map((user) => ({
      key: user._id,
      name: user.username,
      phone: user.phone,
      countOrders: user.countOrders,
      createdAt: dayjs(user.createdAt).format("DD/MM/YYYY"),
    }));
  }, [usersPage]);

  return (
    <div className="flex flex-col my-2 mx-1">
      <div className="w-[15%]">
        <Select
          style={{ width: "100%", textAlign: "start" }}
          value={filter}
          onChange={(value) => setFilter(value)}
        >
          <Select.Option value="newest">Vừa tạo</Select.Option>
          <Select.Option value="countOrders">Ra đơn nhiều nhất</Select.Option>
        </Select>
      </div>
      <Table
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        dataSource={formatData}
        rowClassName="cursor-pointer"
        columns={columns}
        pagination={{
          pageSize: 5,
          total: usersPage?.total,
          onChange: (page) => {
            setPage(page - 1);
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`${pathNames.ADMIN_DASHBOARD_USERS}/${record?.key}`);
            },
          };
        }}
        rowSelection={{
          ...rowSelection,
          type: "checkbox",
        }}
      />
    </div>
  );
};

export default authAdmin(Users);
