import LoginForm from "@/src/containers/public/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("auth/user/main");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-500">
      <LoginForm />
    </div>
  );
}
