import InputForm from "@/src/components/InputForm";
import Button from "@/src/containers/public/Button";
import useLoginAdmin from "@/src/react-query/useLoginAdmin";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function Admin() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { mutate: login } = useLoginAdmin();
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token-admin");
    if (token) router.replace("dashboard/main");
  }, [router]);

  const onSubmit = () => {
    if (!phone || !password) {
      toast.error("Vui lòng nhập đủ!!");
      return undefined;
    }
    login({ phone, password });
  };

  return (
    <div className="w-screen h-screen bg-[#2b2b2b]">
      <div className="bg-animation">
        <div className="absolute">
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="md:w-[30%] w-full bg-white p-5 rounded-md">
              <h3 className="text-[24px] mb-5 text-center font-bold">
                Đăng nhập
              </h3>
              <div className="flex flex-col gap-5">
                <InputForm
                  onChange={(e) => setPhone(e.target.value)}
                  fieldName="phone"
                  value={phone}
                  placeholder="SĐT"
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
                  bgColor="bg-[#493EFF]"
                  hover="hover:bg-[rgba(73,62,255,0.9)]"
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
