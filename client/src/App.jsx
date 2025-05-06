import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import BecomeInstructor from "./pages/BecomeInstructor";
import CreateLesson from "./pages/CreateLesson";
import Profile from "./pages/Profile";
import CourseDetail from "./pages/CourseDetail";
import AllCourses from "./pages/AllCourses";
import UpdateCourse from "./pages/UpdateCourse";
import UpdateLesson from "./pages/UpdateLesson";
import CreateCourse from "./pages/CreateCourse";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose="1000" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/become-instructor" element={<BecomeInstructor />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-lesson/:id" element={<CreateLesson />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
        <Route path="/update-lesson/:id" element={<UpdateLesson />} />
      </Routes>
    </>
  );
};

export default App;
