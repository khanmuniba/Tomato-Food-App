import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Food from "../Models/foodModel.js";
import { connectDB } from "../configs/db.js";  

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Read JSON file
let rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "food_list.json"), "utf-8")
);

// ✅ Clean & transform JSON
const foodData = rawData.map(item => ({
  id: Number(item._id),  // move old _id → id
  name: item.name,
  image: item.image,
  price: item.price,
  description: item.description,
  category: item.category
  // _id is excluded → Mongo will create its own
}));

const seedFood = async () => {
  try {
    await connectDB();
    await Food.deleteMany(); 
    await Food.insertMany(foodData);
    console.log("✅ Food data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding food data:", err.message);
    process.exit(1);
  }
};

seedFood();
