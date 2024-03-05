import { catchAsync } from "@/src/utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/User";
export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "123", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  const user = await User.findOne({ phone, role: "USER" }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ msg: "SĐT hoặc mật khẩu sai!!!" });
  }
  const token = signToken(user._id);

  return res.status(200).json({ msg: "Đăng nhập thành công", token });
});

const getProfile = catchAsync(async (req, res) => {
  const user = req.user;
  return res.status(200).json({ data: user });
});

const register = catchAsync(async (req, res) => {
  const { phone, password, username, confirmPassword } = req.body;
  if (!phone || !password || !username || !confirmPassword) {
    return res.status(400).json({ msg: "Vui lòng nhập đủ form" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Mật khẩu không trùng khớp!!!" });
  }

  const user = await User.findOne({ phone });

  if (user) {
    return res.status(400).json({ msg: "SĐT đã tồn tại!!!" });
  }

  const response = await User.create({ phone, password, username });
  const token = signToken(response._id);

  return res.status(200).json({ msg: "Đăng kí thành công", token });
});

const getUsers = catchAsync(async (req, res) => {
  const { page = 0, size = 5, sortBy } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  let sort = {};

  if (sortBy === "countOrders") {
    sort = { countOrders: -1 };
  } else {
    sort = { createdAt: -1 };
  }

  let analysis = await User.aggregate([
    { $match: { role: "USER" } },
    { $sort: sort },
    {
      $facet: {
        users: [{ $skip: skip }, { $limit: limit }],
        pagination: [{ $count: "total" }],
      },
    },
  ]);

  const { users, pagination } = analysis[0];
  return res.status(200).json({
    msg: "Danh sách User",
    data: {
      users,
      total: pagination[0].total,
    },
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);

  return res.status(200).json({ data: user });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ msg: "Vui lòng nhập đủ thông tin" });
  }

  const _updatedUser = await User.findById(user._id);
  _updatedUser.password = newPassword;
  _updatedUser.save();
  const token = signToken(user._id);

  return res.status(200).json({ msg: "Đổi mật khẩu thành công", token });
});

export { getProfile, getUsers, login, register, getById, changePassword };
