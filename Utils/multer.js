const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image supported"));
  }
};

const fileSize = { limits: 1024 * 1024 *10 };

const upload = multer({
  storage,
  fileSize,
  fileFilter,
});

module.exports = upload;
