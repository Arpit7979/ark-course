import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="text-white bg-slate-800 p-10 min-h-screen">
      <div className="mt-30 bg-slate-900 flex flex-col items-center justify-center p-10 gap-5 rounded-lg">
        <div className="w-30 h-30 border-2 rounded-full flex items-center">
          <img className="w-30" src="/women.png" alt="" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user?.name.toUpperCase()}</h1>
          <h3 className="text-base">{user?.email}</h3>
          <h3 className="text-base text-gray-500">{user?.role}</h3>
        </div>
        {user?.role === "instructor" ? (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-course")}
              className="px-4 py-2 bg-indigo-800 text-sm hover:px-5 transition-all rounded-lg cursor-pointer"
            >
              Create Course
            </button>
            <button
              onClick={() => navigate("/all-courses")}
              className="px-4 py-2 bg-indigo-800 text-sm hover:px-5 transition-all rounded-lg cursor-pointer"
            >
              All Courses
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
