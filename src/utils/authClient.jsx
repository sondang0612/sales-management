import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Sidebar from "../containers/private/user/Sidebar";
import useProfile from "../react-query/useProfile";

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
      <Sidebar>
        <Component {...rest}>{children}</Component>
      </Sidebar>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authClient;
