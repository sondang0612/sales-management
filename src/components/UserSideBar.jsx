/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import pathNames from "../utils/pathNames";

const UserSideBar = ({ data, isAdmin }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = () => {
    router.replace(isAdmin ? pathNames.ADMIN_LOGIN : pathNames.USER_LOGIN);
    isAdmin
      ? localStorage.removeItem("token-admin")
      : localStorage.removeItem("token");
    toast.success("Đăng xuất thành công!!");
    queryClient.removeQueries();
  };
  // console.log(router);
  return (
    <ul>
      {data.map(({ infor, img, url, isLogout }, i) => {
        return !isLogout ? (
          <Link href={`${url}`} passHref key={i}>
            <li
              className={
                router.pathname === url
                  ? "flex items-center py-2 px-4 ml-2 space-x-6 text-black bg-[#e5e5eb]  cursor-pointer"
                  : "flex items-center py-2 px-4 ml-2 space-x-6 hover:text-black hover:bg-[#e3e3e9]  cursor-pointer duration-75"
              }
            >
              <img src={img} alt={img} className="w-6 h-6" />
              <span className="text-[13px]">{infor}</span>
            </li>
          </Link>
        ) : (
          <li
            onClick={logout}
            className="flex items-center py-2 px-4 ml-2 space-x-6 hover:text-black hover:bg-[#e3e3e9]  cursor-pointer duration-75"
          >
            <img src={img} alt={img} className="w-6 h-6" />
            <span className="text-[13px]">{infor}</span>
          </li>
        );
      })}
    </ul>
  );
};

// export default UserSideBar;
export default dynamic(Promise.resolve(UserSideBar), { ssr: false });
