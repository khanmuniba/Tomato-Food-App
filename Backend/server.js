import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./configs/db.js";
import foodRouter from "./Routes/FoodRoute.js";
import userRouter from "./Routes/userRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import { placeOrder } from "./Controllers/orderController.js";
import orderRouter from "./Routes/orderRoute.js";

// Load env vars
dotenv.config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

// ✅ Serve static files (Uploads folder)
app.use("/uploads", express.static(path.join(path.resolve(), "Uploads")));


// DB Connection
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is working fine...");
});

// Server listen
const port = process.env.PORT || 5000; // better to use 5000 for backend
app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
