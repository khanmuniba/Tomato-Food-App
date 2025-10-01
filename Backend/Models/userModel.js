import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // better to make email unique
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// Fix: use mongoose.models to avoid overwrite error in dev
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
