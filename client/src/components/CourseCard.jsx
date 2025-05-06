import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/courseContext";

const CourseCard = ({ course }) => {
  const { publishCourse } = useContext(CourseContext);
  const navigate = useNavigate();
  const { title, description, price } = course;
  const { name } = course.instructor;

  return (
    <div className="w-[400px] h-[350px] flex flex-col items-center text-white bg-slate-900 rounded-sm py-5  hover:scale-95 transition-transform duration-300">
      <div className="flex justify-between w-full px-8 gap-4">
        <h1
          onClick={() => navigate(`/course-detail/${course._id}`)}
          className="font-semibold text-base cursor-pointer truncate w-full"
        >
          {title}
        </h1>
        {name && (
          <h4 className="font-semibold text-base bg-slate-700 px-2 py-1 rounded-lg">
            {name}
          </h4>
        )}
      </div>
      <div
        onClick={() => navigate(`/course-detail/${course._id}`)}
        className="w-[100%] h-[200px] overflow-hidden py-2 cursor-pointer"
      >
        <img
          className="w-full h-full object-cover"
          src={`${import.meta.env.VITE_BACKEND_URL}/upload/${course?.image}`}
          alt=""
        />
      </div>
      <h3
        onClick={() => navigate(`/course-detail/${course._id}`)}
        className="text-gray-400 text-base px-8 cursor-pointer truncate w-full"
      >
        {description}
      </h3>
      <div className="flex justify-between w-full px-8 mt-3">
        <h3 className="font-semibold text-base">₹ {price}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/create-lesson/${course?._id}`)}
            className="px-4 py-2 bg-indigo-800 text-sm hover:bg-indigo-900 transition-all rounded-lg cursor-pointer"
          >
            Add lesson
          </button>
          <button
            onClick={() => publishCourse(course?._id)}
            className="px-4 py-2 bg-indigo-800 text-sm hover:bg-indigo-900 transition-all rounded-lg cursor-pointer"
          >
            {course?.isPublished ? "Unpublish" : "publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
