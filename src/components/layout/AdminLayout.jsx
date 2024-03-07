import UserSideBar from "@/src/components/UserSideBar";
import { MENU_ADMIN_INFORMATION } from "@/src/constant";
import { Col, Image, Row } from "antd/lib/index";
const AdminLayout = ({ title, children }) => {
  return (
    <div className="min-h-[calc(100vh)] bg-[#f0f2f5] ">
      <div className="pt-5 ml-4 bg-[#f0f2f5]"></div>
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
                <h3 className="text-base text-gray-700">ADMIN</h3>
              </Col>
            </Row>
            <div className="mt-3">
              <UserSideBar data={MENU_ADMIN_INFORMATION} isAdmin />
            </div>
          </Col>
          <Col flex="1 1 0%">
            {typeof title === "string" ? (
              <h3 className="px-4 mb-7 text-2xl text-center">{title}</h3>
            ) : (
              title
            )}
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminLayout;
