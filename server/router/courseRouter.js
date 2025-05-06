import express from "express";
import { protect } from "../middleware/protect.js";
import { isInstructor } from "../middleware/instructor.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getAllPublishCourse,
  getCourseById,
  handleThumbnailUpload,
  togglePublish,
  updateCourse,
} from "../controller/courseController.js";
import { upload } from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", protect, isInstructor, createCourse);
courseRouter.get("/all-courses", protect, isInstructor, getAllCourses);
courseRouter.put(
  "/update-course/:courseId",
  protect,
  isInstructor,
  updateCourse
);
courseRouter.patch("/:courseId/publish", protect, isInstructor, togglePublish);
courseRouter.delete(
  "/delete-course/:courseId",
  protect,
  isInstructor,
  deleteCourse
);
courseRouter.get("/publish-courses", getAllPublishCourse);
courseRouter.get("/publish-courses/:id", getCourseById);
courseRouter.post(
  "/upload-thumbnail",
  protect,
  isInstructor,
  upload.single("thumbnail"),
  handleThumbnailUpload
);

export default courseRouter;
