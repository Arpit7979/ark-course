import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, message: "Unauthorized" });
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken.id).select("-password");
    if (!user)
      return res.json({ success: false, message: "Unauthorized, plz login" });
    req.user = user;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
