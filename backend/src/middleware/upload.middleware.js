import multer from "multer";
import path from "path";
import fs from "fs";

// Create folder if not exists
const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/avatars";
    createFolder(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `avatar-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// Post Storage
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/posts";
    createFolder(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = `post-${Date.now()}${path.extname(
      file.originalname
    )}`;

    cb(null, uniqueName);
  },
});

const storyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/stories";
    createFolder(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = `story-${Date.now()}${path.extname(
      file.originalname
    )}`;

    cb(null, uniqueName);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image or video files are allowed"));
  }
};


// Avatar Upload
export const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Post Upload
export const uploadPost = multer({
  storage: postStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const uploadStory = multer({
  storage: storyStorage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
