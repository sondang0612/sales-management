import React from "react";
import Navigate from "../components/Navigate";
import { useRouter } from "next/navigation";
import useProfile from "../react-query/useProfile";
import toast from "react-hot-toast";
import Image from "next/image";
import plusLogo from "@/public/plus-white.svg";
import { useQueryClient } from "@tanstack/react-query";

const authClient = (Component) => {
  return function ClientOnly({ children, ...rest }) {
    const { data: profile } = useProfile();
    const [load, setLoad] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const logout = () => {
      router.replace("/");
      localStorage.removeItem("token");
      toast.success("Đăng xuất thành công!!!");
      queryClient.removeQueries();
    };

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
        toast.error("Tài khoản hết hạn!!");
        queryClient.removeQueries();
      } else {
        setLoad(true);
      }
    }, [router, queryClient]);

    return load ? (
      <div className="bg-slate-500 min-h-screen">
        <Component {...rest}>{children}</Component>
        <div className="absolute bottom-5 left-5">
          <div
            className="size-[45px] rounded-full flex items-center justify-center bg-primary cursor-pointer"
            onClick={() => setModal(!modal)}
          >
            <Image src={plusLogo} alt="plus-image" />
          </div>
          {modal && (
            <div className="bg-white w-[120px] rounded-md bottom-[38px] left-8 absolute flex flex-col">
              <p
                className="text-[18px] py-1 text-center cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => {
                  router.replace("/auth/user/main");
                  setModal(false);
                }}
              >
                Báo cáo
              </p>
              <p
                className="text-[18px] py-1 text-center cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => {
                  router.replace("/auth/user/analysis");
                  setModal(false);
                }}
              >
                Thống kê
              </p>
              <p
                className="text-[18px] py-1 text-center cursor-pointer hover:bg-primary hover:text-white"
                onClick={logout}
              >
                Thoát
              </p>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authClient;
