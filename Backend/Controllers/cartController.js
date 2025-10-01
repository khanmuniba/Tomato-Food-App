import userModel from '../Models/userModel.js'

// add items in the user Cart
// add items in the user Cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.user.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Added to the Cart Successfully" });
  } catch (error) {
    console.log("Add to Cart Error:", error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};





// remove Item from userCart 
const removeFromCart = async (req, res) => {
  try {
    // userId comes from token middleware
    let userData = await userModel.findById(req.user.id);
    let cartData = userData.cartData;

    const itemId = req.body.itemId;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Removed Successfully" });
  } catch (error) {
    console.log("Remove from Cart Error:", error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};


//fetch userCart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export {addToCart,removeFromCart,getCart}