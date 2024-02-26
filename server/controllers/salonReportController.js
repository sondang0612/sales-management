import { catchAsync } from "@/src/utils/catchAsync";
import SalonReport from "../models/SalonReport";
import User from "../models/User";
import mongoose from "mongoose";

const create = catchAsync(async (req, res) => {
  const user = req.user;

  const { formData } = req.body;

  const countOrders =
    formData.filter((item) => item.category === "re-take-care-have-account")
      .length || 0;

  if (countOrders !== 0) {
    await User.findByIdAndUpdate(user._id, {
      countOrders: user.countOrders + countOrders,
    });
  }

  const result = formData.map((item) => ({ ...item, user: user._id }));
  SalonReport.insertMany(result);
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
          phone: "$phone",
          address: "$address",
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

  const { data, pagination } = salons[0];

  const dataResult = data?.map((item) => item._id);
  dataResult.push(
    ...Array.from(Array(Math.abs(limit - dataResult.length)), (_) => null)
  );

  res.status(200).json({
    data: {
      salons: dataResult,
      totalPages: Math.ceil(pagination[0].total / limit),
    },
  });
});

const getSalonReportAnalysisByName = catchAsync(async (req, res) => {
  const user = req?.user;
  const { name, userId } = req.query;
  let match = {};
  if (userId) {
    match = { user: new mongoose.Types.ObjectId(userId), name };
  } else {
    match = { name, user: user._id };
  }
  const salons = await SalonReport.aggregate([
    { $match: match },
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

const getSalonsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.query;
  const { page = 0, size = 5 } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  const salons = await SalonReport.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          name: "$name",
          phone: "$phone",
          address: "$address",
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

  const { data, pagination } = salons[0];

  const dataResult = data?.map((item) => item._id);
  dataResult.push(
    ...Array.from(Array(Math.abs(limit - dataResult.length)), (_) => null)
  );

  res.status(200).json({
    data: {
      salons: dataResult,
      totalPages: Math.ceil(pagination[0].total / limit),
    },
  });
});

export { create, getMySalons, getSalonReportAnalysisByName, getSalonsByUserId };
