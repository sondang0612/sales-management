import React from "react";
import Navigate from "../components/Navigate";
import { useRouter } from "next/navigation";
import useProfile from "../react-query/useProfile";
import toast from "react-hot-toast";
import Image from "next/image";
import plusLogo from "@/public/plus-white.svg";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../containers/private/admin/Header";
import Sidebar from "../containers/private/admin/Sidebar";

const authAdmin = (Component) => {
  return function AdminOnly({ children, ...rest }) {
    const [load, setLoad] = React.useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    React.useEffect(() => {
      const token = localStorage.getItem("token-admin");
      if (!token) {
        router.replace("/");
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

export default authAdmin;
