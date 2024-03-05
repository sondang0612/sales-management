import { Layout } from "antd/lib/index";

const { Content } = Layout;
const MainLayout = ({ children }) => {
  return (
    <Layout className="w-screen min-w-[1400px]">
      <Layout>
        <Content className={"mx-auto min-w-[1000px] md:w-[95%]"}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
