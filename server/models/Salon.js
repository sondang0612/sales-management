import mongoose, { models } from "mongoose";

const { Schema } = mongoose;
const salonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Salon = models.Salon || mongoose.model("Salon", salonSchema);

export default Salon;
