import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] bg-slate-900 text-white flex items-center justify-between p-10 fixed top-0 z-99">
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        ArkCourses
      </h1>
      {user ? (
        <div className="flex gap-5 items-center">
          {user?.role === "student" ? (
            <h4
              onClick={() => navigate("/become-instructor")}
              className="text-base hover:p-2 hover:rounded-lg hover:bg-indigo-800 transition-all cursor-pointer"
            >
              Become Instructor
            </h4>
          ) : null}
          <h4
            onClick={() => navigate("/profile")}
            className="text-base cursor-pointer hover:text-lg transition-all"
          >
            👋{" " + user?.name.toUpperCase()}
          </h4>
          <h4 className="text-sm cursor-pointer" onClick={logoutUser}>
            Logout
          </h4>
        </div>
      ) : (
        <div className="flex gap-5">
          <h4
            className="text-sm cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </h4>
          <h4
            className="text-sm cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </h4>
        </div>
      )}
    </div>
  );
};

export default Navbar;
