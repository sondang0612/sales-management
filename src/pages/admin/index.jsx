import InputForm from "@/src/components/InputForm";
import Button from "@/src/containers/public/Button";
import useLoginAdmin from "@/src/react-query/useLoginAdmin";
import pathNames from "@/src/constant/pathNames";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function Admin() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  const { mutate: login, isPending: isPendingLoginAdmin } = useLoginAdmin({
    onSuccess: () => {
      router.replace(pathNames.ADMIN_USERS);
    },
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token-admin");
    if (token) {
      localStorage.removeItem("token");
      router.replace(pathNames.ADMIN_USERS);
    }
  }, [router]);

  const onSubmit = () => {
    if (!phone || !password) {
      toast.error("Vui lòng nhập đủ!!");
      return undefined;
    }
    login({ phone, password });
  };

  return (
    <div className="h-screen bg-image flex items-center justify-center">
      {show && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="md:w-[30%] w-full p-5 rounded-md shadow-md bg-blue-100">
            <h3 className="text-[24px] mb-5 text-center font-bold text-blue-500">
              Đăng nhập
            </h3>
            <div className="flex flex-col gap-5">
              <InputForm
                onChange={(e) => setPhone(e.target.value)}
                fieldName="phone"
                value={phone}
                placeholder="SĐT/Tên"
              />
              <InputForm
                onChange={(e) => setPassword(e.target.value)}
                fieldName="password"
                value={password}
                type="password"
                placeholder="Mật khẩu"
              />
              <Button
                title={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-blue-500"
                hover="hover:bg-black"
                onClick={onSubmit}
                disabled={isPendingLoginAdmin}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
