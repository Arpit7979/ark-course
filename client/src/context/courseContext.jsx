import { createContext, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [publishCourses, setPublishCourses] = useState(null);
  const [courses, setCourses] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [thumbnailPath, setThumbnailPath] = useState(null);
  const [videoPath, setVideoPath] = useState(null);

  //get all publish courses
  const getAllPublishCourses = async () => {
    try {
      const { data } = await API.get("/api/course/publish-courses");
      if (data.success) {
        setPublishCourses(data.courses);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //get all course
  const getAllCourses = async () => {
    try {
      const { data } = await API.get("/api/instructor/all-courses");
      if (data.success) {
        setCourses(data.courses);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //publish course
  const publishCourse = async (courseId) => {
    try {
      const { data } = await API.patch(`/api/instructor/${courseId}/publish`);
      if (data.success) {
        data.isPublished
          ? toast.success("Course Published")
          : toast.success("Course Unpublished");
        navigate("/");
        getAllPublishCourses();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //course Detail
  const courseDetail = async (courseId) => {
    try {
      const { data } = await API.get(`/api/course/publish-courses/${courseId}`);
      if (data.success) {
        toast.success(data.message);
        setCourse(data.course);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const courseLesson = async (courseId) => {
    try {
      const { data } = await API.get(`/api/lesson/course-lesson/${courseId}`);
      if (data.success) {
        setLessons(data.lessons);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteCourse = async (courseId) => {
    try {
      const { data } = await API.delete(
        `/api/instructor/delete-course/${courseId}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCourses();
        navigate("/all-courses");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //delete lesson
  const deleteLesson = async (lessonId) => {
    try {
      const { data } = await API.delete(
        `/api/lesson/delete-lesson/${lessonId}`
      );
      if (data.success) {
        toast.success(data.message);
        courseLesson();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //get single lesson
  const lessonDetail = async (lessonId) => {
    try {
      const { data } = await API.get(`/api/lesson/single-lesson/${lessonId}`);
      if (data.success) {
        setLesson(data.lesson);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //upload image
  const uploadImage = async (thumbnail) => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      const { data } = await API.post(
        "/api/instructor/upload-thumbnail",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data.success) {
        setThumbnailPath(data.file?.filename);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //upload video
  const uploadVideo = async (video) => {
    try {
      const formData = new FormData();
      formData.append("video", video);
      const { data } = await API.post("/api/lesson/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        setVideoPath(data.file?.filename);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    publishCourses,
    getAllPublishCourses,
    courses,
    getAllCourses,
    publishCourse,
    courseDetail,
    course,
    courseLesson,
    lessons,
    deleteCourse,
    deleteLesson,
    lesson,
    lessonDetail,
    uploadImage,
    thumbnailPath,
    uploadVideo,
    videoPath,
  };
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
