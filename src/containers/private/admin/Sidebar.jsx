import React from "react";
import { RxSketchLogo, RxDashboard } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    router.replace("/auth/admin/login");
    localStorage.removeItem("token-admin");
    toast.success("Đăng xuất thành công!!!");
    queryClient.removeQueries();
  };
  return (
    <div className="flex bg-gray-300">
      <div className="w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
            <RxSketchLogo size={20} />
          </div>
          <span className="border-b-[1px] border-gray-200 w-full p-2" />

          <div
            className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block my-4"
            onClick={() => router.replace("main")}
          >
            <RxDashboard size={20} />
          </div>
          <span className="border-b-[1px] border-gray-200 w-full p-2" />
          <div
            className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block my-4"
            onClick={() => router.replace("users")}
          >
            <CiUser size={20} />
          </div>
          <span className="border-b-[1px] border-gray-200 w-full p-2" />
          <div
            className="bg-gray-100 hover:bg-red-500 text-red-500 hover:text-white cursor-pointer p-3 rounded-lg inline-block my-4"
            onClick={logout}
          >
            <IoLogOut size={20} />
          </div>
        </div>
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
