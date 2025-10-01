import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    const newOrder = new orderModel({
  userId: req.user.id,
  items: req.body.items,
  amount: req.body.amount,
  address: req.body.address,
  status: "Food Processing",
  date: new Date(),
  payment: false,
});

    await newOrder.save();

    // Clear user cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "aud", // Stripe requires lowercase currency codes
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as a separate item
    line_items.push({
      price_data: {
        currency: "aud",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // ✅ FIXED: sessions.create (not session.create)
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order Placement Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
// verify order function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );
      return res.json({ success: true, message: "Paid", order: updatedOrder });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log("Verify order error:", error);
    return res.json({ success: false, message: "Error", error: error.message });
  }
};
//user order for frontend
const userOrder=async(req,res)=>{
 try{
const orders=await orderModel.find({userId:req.user.id});
 res.json({success:true,data:orders})
 }catch(error){
console.log(error)
res.json({success:false,message:"Error"})
 }
}
//listing orders for admin panel
const listOrder=async(req,res)=>{
    try{
      const orders=await orderModel.find({})
      res.json({success:true,data:orders})
    }catch(error){
      console.log(error);
      res.json({success:false,message:"error"})
      
    }
}
// api for updating status
const updateStatus=async(req,res)=>{
try{
await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
res.json({success:true,message:"Status Updated"})
}catch(error){
console.log(error)
res.json({success:false,message:"Error"})
}
}
export { placeOrder ,verifyOrder,userOrder,listOrder,updateStatus};
