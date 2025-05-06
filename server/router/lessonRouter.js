import express from "express";
import { protect } from "../middleware/protect.js";
import { isInstructor } from "../middleware/instructor.js";
import {
  addLesson,
  deleteLesson,
  getLessonByCourse,
  getLessonById,
  handleVideo,
  updateLesson,
} from "../controller/lessonController.js";
import { uploadVideo } from "../middleware/multer.js";

const lessonRouter = express.Router();

lessonRouter.post("/add-lesson/:courseId", protect, isInstructor, addLesson);
lessonRouter.get("/course-lesson/:courseId", getLessonByCourse);
lessonRouter.put(
  "/update-lesson/:lessonId",
  protect,
  isInstructor,
  updateLesson
);
lessonRouter.delete(
  "/delete-lesson/:lessonId",
  protect,
  isInstructor,
  deleteLesson
);
lessonRouter.get("/single-lesson/:lessonId", getLessonById);
lessonRouter.post(
  "/upload-video",
  protect,
  isInstructor,
  uploadVideo.single("video"),
  handleVideo
);

export default lessonRouter;
