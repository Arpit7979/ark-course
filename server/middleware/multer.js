import multer from "multer";
import path from "path";

const Imagestorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const videoStorgae = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/videos/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

//filter only video
const fileFilter = (req, file, cb) => {
  const allowedVideo = ["video/mkv", "video/mp4", "video/avi", "video/webm"];
  if (allowedVideo.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type, only video file is allowed"));
};

export const uploadVideo = multer({
  storage: videoStorgae,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter,
});

export const upload = multer({ storage: Imagestorage });
