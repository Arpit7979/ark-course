import CourseModel from "../model/courseModel.js";
import LessonModel from "../model/lessonSchema.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, image, category, thumbnail } = req.body;
    if (!title || !description || !category)
      return res.json({ success: false, message: "Missing fields" });
    const newCourse = new CourseModel({
      title,
      description,
      price,
      image,
      category,
      instructor: req.user._id,
      thumbnail,
    });
    await newCourse.save();
    return res.json({
      success: true,
      message: "Course created",
      course: newCourse,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//list all the courses of instructor
export const getAllCourses = async (req, res) => {
  try {
    const instructor = req.user._id;
    const courses = await CourseModel.find({ instructor });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//update course
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findById(courseId);
    if (!course)
      return res.json({ success: false, message: "No course found" });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.json({
        success: false,
        message: "You are not instructor of this course",
      });
    const { title, description, price, image, category, isPublished } =
      req.body;
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.image = image || course.image;
    course.category = category || course.category;
    course.isPublished = isPublished || course.isPublished;
    await course.save();
    res.json({ success: true, message: "course updated", course });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//toggle publish
export const togglePublish = async (req, res) => {
  try {
    const course = await CourseModel.findOneAndUpdate({
      _id: req.params.courseId,
      instructor: req.user._id,
    });
    if (!course)
      return res.json({ success: false, message: "No course found" });
    course.isPublished = !course.isPublished;
    await course.save();
    res.json({
      success: true,
      isPublished: course.isPublished,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.courseId);
    if (!course)
      return res.json({ success: false, message: "No course found" });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.json({
        success: false,
        message: "You are not instructor of this course",
      });
    await course.deleteOne();
    await LessonModel.deleteMany({ course: course._id });
    res.json({ success: true, message: "Course deleted and also lesson" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get all publish course(public)
export const getAllPublishCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find({ isPublished: true }).populate(
      "instructor",
      "name"
    );
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get course by id
export const getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      "instructor",
      "name"
    );
    if (!course)
      return res.json({ success: false, message: "Course not found" });
    res.json({ success: true, course });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const handleThumbnailUpload = async (req, res) => {
  try {
    res.json({ success: true, file: req.file });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
