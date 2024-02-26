import mongoose, { models } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const salonReportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "no-account",
        "re-take-care-no-account",
        "re-take-care-have-account",
      ],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Report must belong to a user"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

salonReportSchema.pre(/^findOne/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});
const SalonReport =
  models.SalonReport || mongoose.model("SalonReport", salonReportSchema);

export default SalonReport;
