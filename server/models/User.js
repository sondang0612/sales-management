import mongoose, { models } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    phone: {
      type: String,
      minLength: [11, "no should have minimum 10 digits"],
      maxLength: [11, "no should have maximum 10 digits"],
      match: [/\d{11}/, "no should only have digits"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre(/^findOne/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
const User = models.User || mongoose.model("User", userSchema);

export default User;
