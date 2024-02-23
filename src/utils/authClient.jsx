import React from "react";
import Navigate from "../components/Navigate";
import { useRouter } from "next/navigation";
import useProfile from "../react-query/useProfile";
import toast from "react-hot-toast";
const authClient = (Component) => {
  return function ClientOnly({ children, ...rest }) {
    const router = useRouter();
    const [load, setLoad] = React.useState(false);
    const { data: profile } = useProfile();

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
        toast.error("Tài khoản hết hạn!!");
      } else {
        setLoad(true);
      }
    }, [router, profile]);

    return load ? (
      <Component {...rest}>{children}</Component>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authClient;
