import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import pathNames from "./pathNames";

const authClient = (Component) => {
  return function ClientOnly({ children, ...rest }) {
    const [load, setLoad] = React.useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace(pathNames.USER_LOGIN);
        toast.error("Tài khoản hết hạn!!");
        queryClient.removeQueries();
      } else {
        setLoad(true);
      }
    }, [router, queryClient]);

    return load ? (
      <Component {...rest}>{children}</Component>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authClient;
