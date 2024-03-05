import InputForm from "@/src/components/InputForm";
import useLogin from "@/src/react-query/useLogin";
import React from "react";
import Button from "./Button";
import useRegister from "@/src/react-query/useRegister";
const LoginForm = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const { mutate: login } = useLogin();
  const { mutate: register } = useRegister();

  React.useEffect(() => {
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setConfirmPassword("");
    setUsername("");
  }, [isRegister]);

  const onSubmit = async () => {
    const payload = { phone, password, username, confirmPassword };
    try {
      if (!isRegister) {
        login({ phone, password });
      } else {
        register(payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-[30%] w-[80%] bg-blue-100 p-5 rounded-md shadow-md">
      <h3 className="text-[24px] mb-5 text-center font-bold text-blue-500">
        {isRegister ? "Đăng kí" : "Đăng nhập"}
      </h3>
      <div className="flex flex-col gap-5">
        {isRegister && (
          <InputForm
            onChange={(e) => setUsername(e.target.value)}
            fieldName="Tên"
            value={username}
            placeholder="Tên"
          />
        )}
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
        {isRegister && (
          <InputForm
            onChange={(e) => setConfirmPassword(e.target.value)}
            fieldName="confirmPassword"
            value={confirmPassword}
            placeholder="Nhập lại mật khẩu"
            type="password"
          />
        )}
        <Button
          title={isRegister ? "Đăng ký" : "Đăng nhập"}
          textColor="text-white"
          bgColor="bg-blue-500"
          hover="hover:bg-black"
          onClick={onSubmit}
        />
      </div>

      <div className="mt-4 flex flex-row justify-between">
        {isRegister ? (
          <>
            <p
              className="md:text-sm text-[10px] cursor-pointer"
              onClick={() => setIsRegister(false)}
            >
              Bạn đã có tài khoản?&nbsp;
              <span className="text-[#493EFF] hover:underline">
                Đăng nhập ngay
              </span>
            </p>
          </>
        ) : (
          <>
            {/* <p
              className="md:text-sm text-[10px] cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Quên mật khẩu?
            </p> */}
            <p
              className="md:text-sm text-[10px] cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Tạo tài khoản mới
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
