import { catchAsync } from "@/src/utils/catchAsync";
import User from "../models/User";
import jwt from "jsonwebtoken";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "123", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  const user = await User.findOne({ phone }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(400).json({ msg: "SĐT hoặc mật khẩu sai!!!" });
  }
  const token = signToken(user._id);

  res.status(200).json({ msg: "Đăng nhập thành công", token });
});

const getProfile = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({ data: user });
});

const register = catchAsync(async (req, res) => {
  const { phone, password, username, confirmPassword } = req.body;
  if (!phone || !password || !username || !confirmPassword) {
    res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  if (password !== confirmPassword) {
    res.status(400).json({ msg: "Mật khẩu không trùng khớp!!!" });
  }

  const user = await User.findOne({ phone });

  if (user) {
    res.status(400).json({ msg: "SĐT đã tồn tại!!!" });
  }

  const response = await User.create({ phone, password, username });
  const token = signToken(response._id);

  res.status(200).json({ msg: "Đăng kí thành công", token });
});

export { login, getProfile, register };
