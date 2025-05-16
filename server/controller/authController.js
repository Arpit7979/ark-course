import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing field" });
    const user = await User.findOne({ email });
    if (user)
      return res.json({ success: false, message: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    //generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //save in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "User register", user: newUser });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "Missing field" });
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User not register" });
    const isPasswordMatch = bcrypt.compare(password, user?.password);
    if (!isPasswordMatch)
      return res.json({ success: false, message: "Invalid crendentials" });
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //save in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "User Login", user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    res.json({ success: true, message: "User logout" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAuth = async (req, res) => {
  try {
    const user = req.user;
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const switchRole = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ success: false, message: "User not found" });
    user.role = "instructor";
    await user.save();
    res.json({ success: true, message: "You are now Instructor" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      profilePic: req?.file?.filename,
    });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addEnrolledCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ success: false, message: "User not found" });
    const alreadyEnrolled = user?.enrolledCourses.includes(courseId);
    if (alreadyEnrolled)
      return res.json({
        success: false,
        message: "User already inrolled in this course",
      });
    else user?.enrolledCourses.push(courseId);
    await user.save();
    res.json({
      success: true,
      message: "User enrolled in this course",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const checkEnrolled = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ success: false, message: "User not found" });
    const isEnrolled = user.enrolledCourses.includes(courseId);
    res.json({ success: true, isEnrolled });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
