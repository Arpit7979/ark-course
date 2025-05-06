import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";
import { CourseContext } from "../context/courseContext";

const UpdateCourse = () => {
  const { courseDetail, course, uploadImage, thumbnailPath } =
    useContext(CourseContext);
  const param = useParams();
  const categories = ["All", "Technology", "Lifestyle", "Health", "Education"];
  const [category, setCategory] = useState(course?.category);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState(course?.title);
  const [description, setDescription] = useState(course?.description);
  const [price, setPrice] = useState(course?.price);
  const navigate = useNavigate();
  const thumbnailInpRef = useRef();
  const handleClick = () => {
    thumbnailInpRef.current.click();
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(file);
  };

  useEffect(() => {
    courseDetail(param.id);
  }, []);

  useEffect(() => {
    uploadImage(thumbnail);
  }, [thumbnail]);

  //update course
  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(
        `/api/instructor/update-course/${param.id}`,
        { title, description, price, category, image: thumbnailPath }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-800 flex items-center justify-center text-white p-10">
      <form
        action=""
        className="w-[80%] h-fit bg-slate-900 flex flex-col p-20 gap-3 rounded-lg mt-20"
      >
        <input
          type="text"
          placeholder="Title"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="DESCRIPTION"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="Number"
          placeholder="PRICE"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          ref={thumbnailInpRef}
          onChange={handleInputChange}
          type="file"
          placeholder="IMAGE"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold hidden"
        />
        {thumbnailPath ? (
          <img
            className="w-30"
            src={`${import.meta.env.VITE_BACKEND_URL}/upload/${thumbnailPath}`}
          />
        ) : (
          <div
            onClick={handleClick}
            className="w-30 h-30 bg-gray-200 rounded-lg text-gray-600 flex items-center justify-center text-center"
          >
            Click to upload image
          </div>
        )}
        <div className="w-full flex gap-2 items-center">
          {categories.map((cat, i) => (
            <button
              type="button"
              onClick={() => setCategory(cat)}
              className={`cursor-pointer px-4 py-2 text-white font-semibold text-base  rounded-lg ${
                category === cat ? "bg-indigo-800" : "bg-slate-800"
              }`}
              key={i}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={updateCourse}
          className="px-4 py-2 bg-indigo-800 text-sm hover:py-3 transition-all rounded-lg cursor-pointer"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
