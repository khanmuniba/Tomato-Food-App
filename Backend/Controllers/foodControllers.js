import Food from "../Models/foodModel.js";



// Controllers/foodControllers.js
 const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // ✅ Ensure image exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    const image = req.file.filename; // save only filename

    // ✅ Auto-increment numeric id
    const lastFood = await Food.findOne().sort({ id: -1 });
    const newId = lastFood ? lastFood.id + 1 : 1;

    const newFood = new Food({
      id: newId,
      name,
      description,
      price,
      category,
      image,
    });

    await newFood.save();

    return res.status(201).json({
      success: true,
      message: "Food added successfully!",
      data: newFood, // return saved food
    });
  } catch (error) {
    console.error("Add Food Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



const listFood = async (req, res) => {
  try {
    const foods = await Food.find();
    console.log("Fetched foods:", foods); // 👈 see what is coming
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("List Food Error:", error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    await Food.findByIdAndDelete(id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
