import LoginForm from "@/src/containers/public/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";
import pathNames from "../constant/pathNames";

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace(pathNames.USER_CREATE_REPORT);
    }
  }, [router]);

  React.useEffect(() => {
    setTimeout(() => {
      setShowLogin(true);
    }, 1000);
  }, []);

  return (
    <div className="h-screen bg-image flex items-center justify-center">
      {showLogin && <LoginForm />}
    </div>
  );
}
