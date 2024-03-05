import LoginForm from "@/src/containers/public/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";
import pathNames from "../constant/pathNames";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace(pathNames.USER_CREATE_REPORT);
    }
  }, [router]);
  return (
    <div className="h-screen bg-[#f2f2f2] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
