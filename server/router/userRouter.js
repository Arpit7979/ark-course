import express from "express";
import {
  addEnrolledCourse,
  checkEnrolled,
  getAuth,
  loginUser,
  logoutUser,
  registerUser,
  switchRole,
  uploadProfilePic,
} from "../controller/authController.js";
import { protect } from "../middleware/protect.js";
import { upload } from "../middleware/multer.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/get-auth", protect, getAuth);
authRouter.post("/become-instructor", protect, switchRole);
authRouter.post(
  "/profile-pic",
  protect,
  upload.single("avatar"),
  uploadProfilePic
);
authRouter.post("/enrolled-course/:courseId", protect, addEnrolledCourse);
authRouter.post("/check-enrolled/:courseId", protect, checkEnrolled);

export default authRouter;
