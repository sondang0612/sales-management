import { catchAsync } from "@/src/utils/catchAsync";
import User from "../models/User";
import { signToken } from "./userController";

const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  const user = await User.findOne({ phone, role: "ADMIN" }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ msg: "SĐT hoặc mật khẩu sai!!!" });
  }
  const token = signToken(user._id);

  return res.status(200).json({ msg: "Đăng nhập thành công", token });
});

export { login };
