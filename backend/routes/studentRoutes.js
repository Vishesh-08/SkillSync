const multer = require("multer");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { authenticateStudentToken, isAuthenticated } = require("../middleware/auth");

// Set storage to save the files on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create directory if it doesn't exist
    }
    cb(null, uploadDir); // Specify the directory where files should be uploaded
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    if (file.fieldname === "resume") {
      cb(null, `${req.body.email}${ext}`);
       req.body.resume=`${req.body.email}${ext}`// Save resume with a specific name
    } else if (file.fieldname === "photo") {
      cb(null, `${req.body.email}${ext}`);
      req.body.photo=`${req.body.email}${ext}`// // Save photo with a specific name
    }
  },
});

// Configure multer to handle multiple file uploads
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = {
      resume: ["application/pdf"],
      photo: ["image/jpeg", "image/png"],
    };

    const allowedMimeTypes = allowedTypes[file.fieldname];
    if (allowedMimeTypes && allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.fieldname}`));
    }
  },
});

const { registerStudent, loginStudent, studentAuth } = require("../controllers/studentController");

// Handle registration with multiple file uploads
router.post(
  "/register",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  registerStudent
);

router.post("/login", loginStudent);

router.use("/upload", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
