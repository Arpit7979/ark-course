import React, { useContext, useEffect } from "react";
import { CourseContext } from "../context/courseContext";
import CourseCard from "../components/CourseCard";
import Loading from "../components/Loading";

const AllCourses = () => {
  const { courses, getAllCourses, loading } = useContext(CourseContext);
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-600 p-3">
      {loading ? (
        <Loading />
      ) : (
        <div className="  grid md:grid-cols-3 grid-cols-1 gap-5 pt-30 md:pb-20 pb-10">
          {courses?.map((course) => (
            <CourseCard course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
