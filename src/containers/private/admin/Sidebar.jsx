import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "antd/lib/index";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
const contentStyle = {
  textAlign: "center",
  minHeight: 50,
  lineHeight: "50px",
  color: "#fff",
  backgroundColor: "#BDBDBD",
};

const siderStyle = {
  lineHeight: "50px",
  color: "#fff",
  backgroundColor: "#333",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  minHeight: "100vh",
  position: "fixed",
};

const Sidebar = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [load, setLoad] = React.useState(false);

  const logout = () => {
    router.replace("/auth/admin/login");
    localStorage.removeItem("token-admin");
    toast.success("Đăng xuất thành công!!!");
    queryClient.removeQueries();
  };

  React.useEffect(() => {
    const id = setTimeout(() => {
      setLoad(true);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Sider style={siderStyle}>
          <div className="flex flex-col">
            <p
              className="text-white hover:bg-black px-5 cursor-pointer md:text-[14px] text-[10px]"
              onClick={() => router.replace("main")}
            >
              Thống kê tổng
            </p>
            <div
              className="text-white hover:bg-black px-5 cursor-pointer md:text-[14px] text-[10px]"
              onClick={() => router.replace("users")}
            >
              Quản lý sales
            </div>
            <div
              className="text-red-500 hover:bg-black px-5 cursor-pointer md:text-[14px] text-[10px]"
              onClick={logout}
            >
              Thoát
            </div>
          </div>
        </Sider>
        <Content style={contentStyle}>{load ? children : <div />}</Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
