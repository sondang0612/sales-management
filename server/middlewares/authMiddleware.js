import { catchAsync } from "@/src/utils/catchAsync";
import User from "@/server/models/User";
import jwt from "jsonwebtoken";
const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (req.cookies.tokenUser || req.cookies.tokenAdmin) {
  //   token = req.cookies.tokenUser || req.cookies.tokenAdmin;
  // }

  if (!token) {
    res.status(401);

    return next(
      new Error("You are not logged in! Please log in to get access.")
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let currentUser = await User.findById(decoded.id).exec();

  if (!currentUser) {
    res.status(401);
    return next(
      new Error("The user belonging to this token does no longer exist.")
    );
  }
  req.user = currentUser;

  next();
});

const restrictAdmin = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.role !== "ADMIN") {
    return res.status(400).json({ msg: "Không có quyền xem!!!" });
  }

  next();
});

export { protect, restrictAdmin };
