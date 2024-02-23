import { catchAsync } from "@/src/utils/catchAsync";
import SalonReport from "../models/SalonReport";
import mongoose from "mongoose";

const create = catchAsync(async (req, res) => {
  const user = req.user;

  const { formData } = req.body;
  let error = {
    msg: undefined,
  };
  for (let i = 0; i < formData.length; i++) {
    if (formData[i].category === "no-account") {
      const salon = await SalonReport.findOne({
        name: formData[i].name,
        phone: formData[i].phone,
        address: formData[i].address,
      });
      if (salon) {
        error.msg = `${formData[i].name} đã tồn tại, vui lòng chọn chăm sóc lại hoặc ra đơn`;
        break;
      }
    }
  }
  if (error.msg) {
    return res.status(400).json({ msg: error.msg });
  }

  const result = formData.map((item) => ({ ...item, user }));
  await SalonReport.insertMany(result);

  res.status(200).json({ msg: "Đã lưu" });
});

const getMySalons = catchAsync(async (req, res) => {
  const user = req.user;
  const { page = 0, size = 5 } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;

  const salons = await SalonReport.aggregate([
    { $match: { user: user._id } },
    {
      $group: {
        _id: {
          name: "$name",
        },
        count: {
          $sum: 1,
        },
      },
    },
    { $sort: { count: -1, "_id.name": 1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        pagination: [{ $count: "total" }],
      },
    },
  ]);

  res.status(200).json({
    data: {
      data: salons[0].data,
      totalPages: Math.ceil(salons[0].pagination[0].total / limit),
    },
  });
});

const getSalonReportAnalysisByName = catchAsync(async (req, res) => {
  const user = req.user;
  const { name } = req.query;

  const salons = await SalonReport.aggregate([
    { $match: { user: user._id, name } },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          name: "$name",
          category: "$category",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({ data: salons });
});

export { create, getMySalons, getSalonReportAnalysisByName };
