import React from "react";
import Navigate from "../components/Navigate";
import { useRouter } from "next/navigation";
const authClient = (Component) => {
  return function ClientOnly({ children, ...rest }) {
    const router = useRouter();
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      } else {
        setLoad(true);
      }
    }, [router]);

    return load ? (
      <Component {...rest}>{children}</Component>
    ) : (
      <div>Loading...</div>
    );
  };
};

export default authClient;
