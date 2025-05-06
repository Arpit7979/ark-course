import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../context/courseContext";

const CourseDetail = () => {
  const {
    courseDetail,
    courseLesson,
    course,
    lessons,
    deleteCourse,
    deleteLesson,
  } = useContext(CourseContext);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    courseDetail(param.id);
    courseLesson(param.id);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-800 text-white p-20">
      <div className="min-h-fit w-[80%] bg-slate-900 mt-20 flex flex-col items-center gap-2 rounded-lg p-10">
        <h2 className="text-[12px] text-gray-400">#{course?.category}</h2>
        <div className="h-[200px] w-[100%] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${import.meta.env.VITE_BACKEND_URL}/upload/${course?.image}`}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-semibold pt-5">
              {course?.title.toUpperCase()}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <h4 className="bg-slate-800 rounded-sm p-1 text-sm">
                  INSTRUCTOR: {course?.instructor.name.toUpperCase()}
                </h4>
                <button
                  onClick={() => navigate(`/create-lesson/${param.id}`)}
                  className="px-4 py-2 bg-indigo-800 text-sm hover:bg-indigo-900 transition-all rounded-lg cursor-pointer"
                >
                  Add lesson
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update-course/${param.id}`)}
                  className="px-4 py-2 bg-green-800 text-sm hover:bg-green-900 transition-all rounded-lg cursor-pointer"
                >
                  Update Course
                </button>
                <button
                  onClick={() => deleteCourse(param.id)}
                  className="px-4 py-2 bg-red-800 text-sm hover:bg-red-900 transition-all rounded-lg cursor-pointer"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
          <p className="text-base text-gray-400 py-1">{course?.description}</p>
          <h3 className="text-xl text-green-600 py-1">₹ {course?.price}</h3>
          {lessons?.map((lesson) => (
            <div
              key={lesson?._id}
              className="flex gap-3 bg-slate-800 w-full p-5 rounded-lg mt-10"
            >
              <div className="w-[200px] h-[100px] overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={`${import.meta.env.VITE_BACKEND_URL}/upload/videos/${
                    lesson?.videoUrl
                  }`}
                />
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">{lesson?.title}</h1>
                  <h2 className="text-base text-gray-400">{lesson?.content}</h2>
                </div>
                <div className="flex flex-col h-full justify-between">
                  <button
                    onClick={() => navigate(`/update-lesson/${lesson?._id}`)}
                    className="px-4 py-2 bg-green-800 text-sm hover:bg-green-900 transition-all rounded-lg cursor-pointer"
                  >
                    Update Lesson
                  </button>
                  <button
                    onClick={() => deleteLesson(lesson?._id)}
                    className="px-4 py-2 bg-red-800 text-sm hover:bg-red-900 transition-all rounded-lg cursor-pointer"
                  >
                    Delete Lesson
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
