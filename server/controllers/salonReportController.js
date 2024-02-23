import { catchAsync } from "@/src/utils/catchAsync";
import SalonReport from "../models/SalonReport";
import mongoose from "mongoose";

const create = catchAsync(async (req, res) => {
  const user = req.user;

  const { formData } = req.body;
  for (let i = 0; i < formData.length; i++) {
    const { name, phone, address, content, category } = formData[i];
    const salon = await SalonReport.findOne({
      name,
      phone,
      address,
      user: user._id,
    });

    if (!salon) {
      await SalonReport.create({
        name,
        phone,
        address,
        user,
        categories: [{ type: "no-account", contents: [{ text: content }] }],
      });
    } else {
      const isExisted =
        salon.categories.filter((item) => item.type === category).length !== 0;
      if (!isExisted) {
        salon.categories.push({
          type: category,
          contents: [{ text: content }],
        });
      } else {
        salon.categories = salon.categories.map((item) =>
          item.type === category
            ? { ...item, contents: [...item.contents, { text: content }] }
            : item
        );
      }
      await salon.save();
    }
  }

  res.status(200).json({ msg: "Đã lưu" });
});

const getMySalons = catchAsync(async (req, res) => {
  const user = req.user;
  const { page = 0, size = 5 } = req.query;
  const skip = +page === 0 ? 0 : +page * +size;
  const limit = +size;

  const result = await SalonReport.aggregate([
    { $match: { user: user._id } },
    { $project: { name: 1 } },
    {
      $facet: {
        pagination: [{ $count: "totalPages" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ]);
  const { pagination, data } = result[0];
  data.push(...Array.from(Array(Math.abs(limit - data.length)), (_) => null));
  res.status(200).json({
    data: {
      data,
      totalPages: Math.ceil(pagination[0].totalPages / limit),
    },
  });
});

const getSalonReportAnalysisByName = catchAsync(async (req, res) => {
  const user = req.user;
  const { name } = req.query;

  const analysis = await SalonReport.aggregate([
    { $match: { user: user._id, name } },
    { $unwind: "$categories" },
    {
      $project: {
        category: "$categories.type",
        count: {
          $cond: {
            if: { $isArray: "$categories.contents" },
            then: { $size: "$categories.contents" },
            else: "NA",
          },
        },
      },
    },
  ]);
  console.log(analysis);
  res.status(200).json({ data: analysis });
});

export { create, getMySalons, getSalonReportAnalysisByName };
