import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import API from "../../api";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [avatarPath, setAvatarPath] = useState(null);
  const inputField = useRef();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };
  const updateProfilePic = async () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      const { data } = await API.post("/api/auth/profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) setAvatarPath(data?.user?.profilePic);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    updateProfilePic();
  }, [avatar]);

  return (
    <div className="text-white bg-slate-800 p-10 min-h-screen">
      <div className="mt-30 bg-slate-900 flex flex-col items-center justify-center p-10 gap-5 rounded-lg relative">
        <div className="w-30 h-30 border-2 rounded-full flex items-center overflow-hidden">
          <img
            className="w-30"
            src={`${import.meta.env.VITE_BACKEND_URL}/upload/${avatarPath}`}
            alt=""
          />
        </div>
        <h1
          onClick={() => inputField.current.click()}
          className="text-lg text-red-500 font-bold absolute right-[46%] bottom-[55%] cursor-pointer"
        >
          X
        </h1>
        <input
          type="file"
          className="hidden"
          ref={inputField}
          onChange={handleChange}
        />
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
