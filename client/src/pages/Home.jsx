import React, { useContext, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { CourseContext } from "../context/courseContext";

const Home = () => {
  const { publishCourses, getAllPublishCourses } = useContext(CourseContext);
  useEffect(() => {
    getAllPublishCourses();
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-600">
      <div className="  grid grid-cols-3 gap-5 pt-30 pb-20">
        {publishCourses?.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;
