import React, { useContext, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { CourseContext } from "../context/courseContext";
import Loading from "../components/Loading";

const Home = () => {
  const { loading, publishCourses, getAllPublishCourses } =
    useContext(CourseContext);
  useEffect(() => {
    getAllPublishCourses();
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-600 p-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="  grid md:grid-cols-3 gap-5 grid-cols-1 pt-30 md:pb-20 pb-10">
          {publishCourses?.map((course) => (
            <CourseCard course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
