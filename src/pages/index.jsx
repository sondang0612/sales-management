import LoginForm from "@/src/containers/public/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";
import pathNames from "../utils/pathNames";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace(pathNames.USER_CREATE_FORM);
  }, [router]);
  return (
    <div className="w-screen h-screen bg-[#2b2b2b]">
      <div className="bg-animation">
        <div className="absolute">
          <div className="w-screen h-screen flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
