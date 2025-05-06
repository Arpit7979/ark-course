import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import { CourseContext } from "../context/courseContext";

const CreateLesson = () => {
  const { videoPath, uploadVideo } = useContext(CourseContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);
  const [order, setOrder] = useState("");
  const navigate = useNavigate();
  const param = useParams();
  const videoInputRef = useRef();
  const handleClick = () => {
    videoInputRef.current.click();
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(file);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/api/lesson/add-lesson/${param.id}`, {
        title,
        content,
        videoUrl: videoPath,
        order,
      });
      if (data.success) {
        toast.success(data.message);
        navigate(`/course-detail/${param.id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.messge);
    }
  };

  useEffect(() => {
    uploadVideo(video);
  }, [video]);

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
          placeholder="CONTENT"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="Number"
          placeholder="ORDER"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <input
          ref={videoInputRef}
          onChange={handleInputChange}
          type="file"
          accept="video/*"
          className="outline-none bg-gray-200 p-2 rounded-lg text-black text-base font-semibold hidden"
        />
        {videoPath ? (
          <video
            controls
            className="w-30"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/upload/videos/${videoPath}`}
          />
        ) : (
          <div
            onClick={handleClick}
            className="w-30 h-30 bg-gray-200 rounded-lg"
          ></div>
        )}

        <button
          onClick={handleFormSubmit}
          className="px-4 py-2 bg-indigo-800 text-sm hover:py-3 transition-all rounded-lg cursor-pointer"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;
