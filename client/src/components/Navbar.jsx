import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] bg-slate-900 text-white flex items-center justify-between md:p-10 p-3 fixed top-0 z-99">
      <h1
        className="md:text-4xl text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        ArkCourses
      </h1>
      {user ? (
        <>
          <div className="hidden md:flex gap-5 items-center">
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
          <div className="md:hidden">
            <button onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <h2>X</h2> : <h2>MENU</h2>}
            </button>
          </div>
          {isOpen && (
            <div className="flex flex-col gap-2 items-center bg-indigo-600 absolute right-5 top-20 p-2 rounded-lg">
              {user?.role === "student" ? (
                <h4
                  onClick={() => navigate("/become-instructor")}
                  className="text-base hover:p-2 hover:rounded-lg hover:bg-indigo-800 transition-all cursor-pointer w-full bg-indigo-900 p-1 rounded-lg"
                >
                  Become Instructor
                </h4>
              ) : null}
              <h4
                onClick={() => navigate("/profile")}
                className="text-base cursor-pointer hover:text-lg transition-all w-full bg-indigo-900 p-1 rounded-lg"
              >
                👋{" " + user?.name.toUpperCase()}
              </h4>
              <h4
                className="text-sm cursor-pointer bg-indigo-900 w-full p-1 rounded-lg"
                onClick={logoutUser}
              >
                Logout
              </h4>
            </div>
          )}
        </>
      ) : (
        <div className="flex md:gap-5 gap-2">
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
