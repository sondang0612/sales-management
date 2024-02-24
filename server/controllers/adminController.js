import { signToken } from "./userController";

const { catchAsync } = require("@/src/utils/catchAsync");
const { default: User } = require("../models/User");

const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  const user = await User.findOne({ phone, role: "ADMIN" }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(400).json({ msg: "SĐT hoặc mật khẩu sai!!!" });
  }
  const token = signToken(user._id);

  res.status(200).json({ msg: "Đăng nhập thành công", token });
});

export { login };
