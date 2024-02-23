import mongoose, { models } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const salonReportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: {
          type: String,
          enum: [
            "no-account",
            "re-take-care-no-account",
            "re-take-care-have-account",
          ],
          required: true,
        },
        contents: [
          {
            text: String,
            createdDate: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Report must belong to a user"],
    },
  },
  { timestamps: true }
);

const SalonReport =
  models.SalonReport || mongoose.model("SalonReport", salonReportSchema);

export default SalonReport;
