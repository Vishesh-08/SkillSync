const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { companyRegister, companyLogin } = require("../controllers/companyController");


const router = express.Router();

// Ensure the upload directory exists
const uploadsDir = path.join(__dirname, "../CompanyUploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "CompanyUploads/"); // Set upload folder
  },
  filename: (req, file, cb) => {
    
    cb(null, `${req.body.companyName}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Define the routes
router.post(
  "/register",
  upload.fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "verificationDocuments", maxCount: 1 },
  ]),
  companyRegister
);

router.post("/login", companyLogin);

module.exports = router;
