import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const authAdmin = (Component) => {
  return function AdminOnly({ children, ...rest }) {
    const [load, setLoad] = React.useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    React.useEffect(() => {
      localStorage.removeItem("token");
    }, []);

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
      <Component {...rest}>{children}</Component>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authAdmin;
