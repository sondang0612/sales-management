import InputForm from "@/src/components/InputForm";
import useLogin from "@/src/react-query/useLogin";
import React from "react";
import Button from "./Button";
const LoginForm = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const { mutate: login } = useLogin();
  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setConfirmPassword("");
    setUsername("");
  }, [isRegister]);

  const onSubmit = async () => {
    const payload = { email, password, username, confirmPassword };
    try {
      if (!isRegister) {
        login({ email, password });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-[30%] w-full bg-white p-5 rounded-md">
      <h3 className="text-[24px] mb-5 text-center font-bold">
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
          onChange={(e) => setEmail(e.target.value)}
          fieldName="email"
          value={email}
          placeholder="Email"
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
          title="Đăng nhập"
          textColor="text-white"
          bgColor="bg-[#493EFF]"
          hover="hover:bg-[rgba(73,62,255,0.9)]"
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
            <p
              className="md:text-sm text-[10px] cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Quên mật khẩu?
            </p>
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
