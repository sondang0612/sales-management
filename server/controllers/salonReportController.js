import { catchAsync } from "@/src/utils/catchAsync";
import SalonReport from "../models/SalonReport";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create = catchAsync(async (req, res) => {
  const user = req.user;

  const { formData } = req.body;

  formData?.forEach(async (item) => {
    await SalonReport.create({ ...item, user });
  });

  res.status(200).json({ msg: "Đã lưu" });
});

const findAllSalonReport = catchAsync(async (req, res) => {
  const user = req.user;
  const reports = await SalonReport.aggregate([
    { $match: { user: user._id } },
    {
      $group: {
        _id: {
          name: "$name",
          category: "$category",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({ data: reports });
});

export { create, findAllSalonReport };
