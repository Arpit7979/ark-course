import express from "express";
import {
  getAuth,
  loginUser,
  logoutUser,
  registerUser,
  switchRole,
} from "../controller/authController.js";
import { protect } from "../middleware/protect.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/get-auth", protect, getAuth);
authRouter.post("/become-instructor", protect, switchRole);

export default authRouter;
