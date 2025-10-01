import { listOrder, placeOrder,updateStatus,userOrder,verifyOrder } from "../Controllers/orderController.js";
import express from 'express'
import authMiddleware from "../Middlewares/auth.js";

const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrder)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)
export default orderRouter