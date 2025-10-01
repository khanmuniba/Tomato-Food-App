import express from "express";
import { addFood, listFood, removeFood } from "../Controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

// ✅ Store all uploaded food images in Uploads/Food
const storage = multer.diskStorage({
  destination: "Uploads", // same folder as seeded images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // unique filename
  }
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
