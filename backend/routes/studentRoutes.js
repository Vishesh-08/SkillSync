const multer = require("multer");
const express = require("express");
const router = express.Router();
const fs=require("fs")
const path = require("path");
const {authenticateStudentToken,isAuthenticated}=require("../middleware/authStudent")

// Set storage to save the file on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create directory if it doesn't exist
    }
    cb(null, uploadDir); // Specify the directory where files should be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.email}.pdf`); // Save the file with the student's email as the filename
  },
});

const upload = multer({ storage: storage });

const { registerStudent,loginStudent } = require("../controllers/studentController");

router.post("/register", upload.single("resume"), registerStudent);

router.post("/login",loginStudent);
//router.post("profile",authenticateStudentToken,studentProfile)
//TODO:student profile yet to be create!

module.exports = router;
