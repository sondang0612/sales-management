import useChangePassword from "@/src/react-query/useChangePassword";
import useProfile from "@/src/react-query/useProfile";
import authClient from "@/src/utils/authClient";
import React from "react";

const Profile = () => {
  const { data: profile } = useProfile();
  const { mutate: changePassword } = useChangePassword();
  const [showPassword, setShowPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-3xl leading-6 font-medium text-gray-900">
            Thông tin cá nhân
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profile?.username}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">SĐT</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profile?.phone}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nhập mật khẩu mới
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-200 h-[30px] outline-none p-2 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <p
                  className="text-[10px] underline cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </p>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-white text-blue-500 px-8 rounded-md mt-2 float-right py-2"
        onClick={() => changePassword({ newPassword })}
      >
        Lưu
      </button>
    </>
  );
};

export default authClient(Profile);
