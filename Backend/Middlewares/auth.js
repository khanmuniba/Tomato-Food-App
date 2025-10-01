import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; // header should look like: "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  const token = authHeader.split(" ")[1]; // get the actual token after "Bearer"
  if (!token) {
    return res.status(401).json({ success: false, message: "Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ safer than using req.body
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;
