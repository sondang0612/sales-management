import { Breadcrumb, Col, Image, Row } from "antd/lib/index";
import Link from "next/link";
import UserSideBar from "@/src/components/UserSideBar";
import useProfile from "@/src/react-query/useProfile";
const UserLayout = ({ title, children }) => {
  const { data: profile } = useProfile();
  return (
    <div className="min-h-[calc(100vh)] bg-[#f0f2f5] ">
      <div className="pt-5 ml-4 bg-[#f0f2f5]">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link href="/">
              <p className="hover:text-blue-500">Trang chủ</p>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-3 bg-[#f0f2f5]">
        <Row>
          <Col flex="200px">
            <Row gutter={[10, 0]} className="px-4">
              <Col flex="55px">
                <Image
                  src="/images/blank-avatar.svg"
                  alt="blank-avatar.png"
                  width={45}
                  height={45}
                  className=" rounded-[50%]"
                />
              </Col>
              <Col flex="1 1 0%">
                <h4 className="text-sm text-gray-500"> Account </h4>
                <h3 className="text-base text-gray-700">{profile?.username}</h3>
              </Col>
            </Row>
            <div className="mt-3">
              <UserSideBar />
            </div>
          </Col>
          <Col flex="1 1 0%">
            <h3 className=" px-4 mb-7 text-2xl text-center">{title}</h3>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserLayout;
