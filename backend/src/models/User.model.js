import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: String,
    email: String,
    photoURL: String,
    role: { type: String, default: "user" },
    provider: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
