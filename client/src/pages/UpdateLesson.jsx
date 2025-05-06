import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";
import { CourseContext } from "../context/courseContext";

const UpdateLesson = () => {
  const param = useParams();
  useEffect(() => {
    lessonDetail(param.id);
  }, []);
  const { lesson, lessonDetail, videoPath, uploadVideo } =
    useContext(CourseContext);
  const [title, setTitle] = useState(lesson?.title);
  const [content, setContent] = useState(lesson?.content);
  const [video, setVideo] = useState(null);
  const [order, setOrder] = useState(lesson?.order);
  const navigate = useNavigate();
  const videoInputRef = useRef();
  const handleClick = () => {
    videoInputRef.current.click();
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(file);
  };
  const updateLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/api/lesson/update-lesson/${param.id}`, {
        title,
        content,
        videoUrl: videoPath,
        order,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
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
          placeholder="IMAGE"
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
            className="w-30 h-30 bg-gray-200 rounded-lg text-gray-600 flex items-center justify-center text-center"
          >
            Click to upload video
          </div>
        )}

        <button
          onClick={updateLesson}
          className="px-4 py-2 bg-indigo-800 text-sm hover:py-3 transition-all rounded-lg cursor-pointer"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
