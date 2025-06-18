import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
