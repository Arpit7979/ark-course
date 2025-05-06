import React from "react";
import { toast } from "react-toastify";
import API from "../../api";

const BecomeInstructor = () => {
  const becomeInstructor = async () => {
    try {
      const { data } = await API.post("/api/auth/become-instructor");
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-800 text-white  p-10">
      <div className="flex items-center justify-center bg-slate-900 mt-40">
        <div className="w-[45%]">
          <img src="/women.png" alt="" />
        </div>
        <div className="w-[45%]">
          <h1 className="text-5xl font-bold">
            Come teach
            <br /> with us
          </h1>
          <p className="text-base">
            Become an instructor and change lives
            <br /> — including your own
          </p>
          <button
            onClick={becomeInstructor}
            className="text-base px-5 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-700 cursor-pointer mt-4"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
