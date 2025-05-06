import CourseModel from "../model/courseModel.js";
import LessonModel from "../model/lessonSchema.js";

export const addLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, order } = req.body;
    if (!title || !content || !videoUrl)
      return res.json({ success: false, message: "Missing fields" });
    const { courseId } = req.params;
    if (!courseId)
      return res.json({ success: false, message: "Course id is not provided" });
    const newLesson = await LessonModel.create({
      title,
      content,
      videoUrl,
      course: courseId,
      order,
    });
    const course = await CourseModel.findById(courseId);
    course.lessons.push(newLesson._id);
    await course.save();
    res.json({ success: true, course, lesson: newLesson });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getLessonByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await LessonModel.find({ course: courseId }).sort("order");
    if (!lessons)
      return res.json({ success: false, message: "No lesson found" });
    res.json({ success: true, lessons });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await LessonModel.findByIdAndUpdate(lessonId, req.body, {
      new: true,
    });
    if (!lesson)
      return res.json({ success: false, message: "No lesson found" });
    res.json({ success: true, lesson });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    await LessonModel.deleteOne({ _id: lessonId });
    res.json({ success: true, message: "Lesson deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await LessonModel.findById(lessonId);
    if (!lesson)
      return res.json({ success: false, message: "No lesson found" });
    res.json({ success: true, lesson });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//upload video
export const handleVideo = async (req, res) => {
  try {
    res.json({ success: true, file: req.file });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
