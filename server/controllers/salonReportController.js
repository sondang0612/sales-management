import { catchAsync } from "@/src/utils/catchAsync";
import mongoose from "mongoose";
import SalonReport from "../models/SalonReport";
import { SIZE } from "@/src/constant";

const create = catchAsync(async (req, res) => {
  const user = req.user;
  const form = req.body;

  await SalonReport.create({ ...form, user });
  res.status(200).json({ msg: "Đã lưu" });
});

const getMySalons = catchAsync(async (req, res) => {
  const user = req.user;
  const { page = 0, size = 5, searchText, year } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  const salons = await SalonReport.aggregate([
    {
      $match: {
        user: user._id,
        name: new RegExp(searchText, "i"),
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00Z`),
          $lte: new Date(`${year}-12-31T00:00:00Z`),
        },
      },
    },
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

  const totalPages = pagination.length !== 0 ? pagination[0].total / limit : 0;

  res.status(200).json({
    data: {
      salons: dataResult,
      totalPages: Math.ceil(totalPages),
    },
  });
});

const getAllMySalons = catchAsync(async (req, res) => {
  const user = req.user;
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
  ]);

  const dataResult = salons?.map((item) => item._id);

  res.status(200).json({
    data: {
      salons: dataResult,
    },
  });
});

const getSalonReportAnalysisByName = catchAsync(async (req, res) => {
  const user = req?.user;
  const { name, userId, year } = req.query;
  let match = {};
  if (userId) {
    match = {
      user: new mongoose.Types.ObjectId(userId),
      name,
      createdAt: {
        $gte: new Date(`${year}-01-01T00:00:00Z`),
        $lte: new Date(`${year}-12-31T00:00:00Z`),
      },
    };
  } else {
    match = {
      name,
      user: user._id,
      createdAt: {
        $gte: new Date(`${year}-01-01T00:00:00Z`),
        $lte: new Date(`${year}-12-31T00:00:00Z`),
      },
    };
  }

  const salons = await SalonReport.aggregate([
    {
      $match: match,
    },
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
  const { page = 0, size = 5, searchText, year } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  const salons = await SalonReport.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        name: new RegExp(searchText, "i"),
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00Z`),
          $lte: new Date(`${year}-12-31T00:00:00Z`),
        },
      },
    },
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
  const totalPages = pagination.length !== 0 ? pagination[0].total / limit : 0;

  res.status(200).json({
    data: {
      salons: dataResult,
      totalPages: Math.ceil(totalPages),
    },
  });
});

const getSalonReportsBySalon = catchAsync(async (req, res) => {
  const user = req.user;
  const { page = 0, size = 5, name, address, phone, year } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  const salons = await SalonReport.aggregate([
    {
      $match: {
        user: user._id,
        name,
        address,
        phone,
      },
    },
    { $sort: { createdAt: -1 } },
    { $project: { category: 1, content: 1, createdAt: 1, images: 1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        pagination: [{ $count: "total" }],
      },
    },
  ]);
  const { data, pagination } = salons[0];

  const totalPages = pagination.length !== 0 ? pagination[0].total / limit : 0;

  return res.status(200).json({
    data: {
      salons: data,
      totalPages: Math.ceil(totalPages),
    },
  });
});

const deleteById = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.query;

  const report = await SalonReport.findOneAndDelete({
    user: user._id,
    _id: new mongoose.Types.ObjectId(id),
  });

  return res.status(204).json({ data: null, msg: "Xóa thành công" });
});

const getSalonReportsBySalonAndUserId = catchAsync(async (req, res) => {
  const { page = 0, size = 5, name, address, phone, id: userId } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;

  const salons = await SalonReport.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        name,
        address,
        phone,
      },
    },
    { $sort: { createdAt: -1 } },
    { $project: { category: 1, content: 1, createdAt: 1, images: 1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        pagination: [{ $count: "total" }],
      },
    },
  ]);
  const { data, pagination } = salons[0];

  const totalPages = pagination.length !== 0 ? pagination[0].total / limit : 0;

  return res.status(200).json({
    data: {
      salons: data,
      totalPages: Math.ceil(totalPages),
    },
  });
});

const getSalonReportsHistory = catchAsync(async (req, res) => {
  const { page = 0, size = SIZE, userId, from, to, name } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;
  let match = { user: new mongoose.Types.ObjectId(userId) };
  if (from !== "undefined" && to !== "undefined") {
    match = {
      ...match,
      createdAt: {
        $gte: new Date(`${from}T00:00:00Z`),
        $lte: new Date(`${to}T24:00:00Z`),
      },
    };
  }
  if (name !== "undefined") {
    match = { ...match, name };
  }
  const salons = await SalonReport.aggregate([
    {
      $match: match,
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        category: 1,
        content: 1,
        createdAt: 1,
        images: 1,
        address: 1,
        phone: 1,
        name: 1,
      },
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        pagination: [{ $count: "total" }],
      },
    },
  ]);

  const { data, pagination } = salons[0];

  const totalPages = pagination.length !== 0 ? pagination[0].total / limit : 0;

  return res.status(200).json({
    data: {
      data,
      totalPages: Math.ceil(totalPages),
    },
  });
});

const getAnalysisByNameAndMonthAtYear = catchAsync(async (req, res) => {
  const { month, name, userId, year } = req.query;

  const salons = await SalonReport.aggregate([
    {
      $match: { name, user: new mongoose.Types.ObjectId(userId) },
    },
    {
      $redact: {
        $cond: [
          {
            $and: [
              { $eq: [{ $month: "$createdAt" }, Number(month)] },
              { $eq: [{ $year: "$createdAt" }, Number(year)] },
            ],
          },
          "$$KEEP",
          "$$PRUNE",
        ],
      },
    },
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
    { $sort: { "_id.category": 1 } },
  ]);

  return res.status(200).json({
    data: {
      data: salons,
    },
  });
});

const getTotalSuccessOrders = catchAsync(async (req, res) => {
  const { userId } = req.query;
  const salons = await SalonReport.find({
    user: new mongoose.Types.ObjectId(userId),
    category: "re-take-care-have-account",
  }).exec();
  return res
    .status(200)
    .json({ data: salons?.length || 0, msg: "Thành công!!!" });
});

export {
  create,
  deleteById,
  getAllMySalons,
  getMySalons,
  getSalonReportAnalysisByName,
  getSalonReportsBySalon,
  getSalonReportsBySalonAndUserId,
  getSalonReportsHistory,
  getSalonsByUserId,
  getAnalysisByNameAndMonthAtYear,
  getTotalSuccessOrders,
};
