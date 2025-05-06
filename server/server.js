import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongoose.js";
import authRouter from "./router/userRouter.js";
import courseRouter from "./router/courseRouter.js";
import lessonRouter from "./router/lessonRouter.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigin = ["http://localhost:5173"];
app.use(express.json());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());
app.use("/upload", express.static(path.join(path.resolve(), "upload")));

app.use("/api/auth", authRouter);
app.use("/api/instructor", courseRouter);
app.use("/api/course", courseRouter);
app.use("/api/lesson", lessonRouter);

app.get("/", (req, res) => res.send("Hello from server"));

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
