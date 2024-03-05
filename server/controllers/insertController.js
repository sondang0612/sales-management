import { catchAsync } from "@/src/utils/catchAsync";
import users from "../data/users.json";
import khanh from "../data/khanh.json";
import linh from "../data/linh.json";
import nhung from "../data/nhung.json";
import phuong from "../data/phuong.json";

import User from "../models/User";
import SalonReport from "../models/SalonReport";

export const insert = catchAsync(async (req, res) => {
  await User.insertMany(users);
  await SalonReport.create(khanh, { validateBeforeSave: false });
  //await SalonReport.create(linh, { validateBeforeSave: false });
  await SalonReport.create(nhung, { validateBeforeSave: false });
  await SalonReport.create(phuong, { validateBeforeSave: false });

  return res.status(200).json({ msg: "Thành công" });
});
