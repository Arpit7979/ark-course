import React, { useContext, useEffect } from "react";
import { CourseContext } from "../context/courseContext";
import CourseCard from "../components/CourseCard";

const AllCourses = () => {
  const { courses, getAllCourses } = useContext(CourseContext);
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-600">
      <div className="  grid grid-cols-3 gap-5 pt-30 pb-20">
        {courses?.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
