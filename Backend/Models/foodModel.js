import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  id: { type: Number, required: true },   // your custom ID
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Food = mongoose.model("Food", foodSchema, "foods");

export default Food;
