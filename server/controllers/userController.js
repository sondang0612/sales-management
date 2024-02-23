import { catchAsync } from "@/src/utils/catchAsync";
import User from "../models/User";
import jwt from "jsonwebtoken";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "123", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(400).json({ msg: "Tài khoản hoặc mật khẩu sai!!!" });
  }
  const token = signToken(user._id);

  res.status(200).json({ msg: "Đăng nhập thành công", token });
});

const getProfile = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({ data: user });
});

export { login, getProfile };
