import FormSteps from "@/src/containers/private/FormSteps";
import useProfile from "@/src/react-query/useProfile";
import authClient from "@/src/utils/authClient";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Main = () => {
  const { data: user } = useProfile();
  const queryClient = useQueryClient();

  const logout = () => {
    window.location.href = "";
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công!!!");
    queryClient.removeQueries();
  };

  return (
    <div className="bg-slate-500 w-screen h-screen flex items-center justify-center relative">
      <FormSteps />
    </div>
  );
};

export default authClient(Main);
