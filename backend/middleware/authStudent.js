const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { redirect } = require("react-router-dom");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.authToken;

  // Check if token is present
  if (!token) {
    return res.status(301);
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Find the student by email
    const student = await Student.findOne({ email: verified.email });
    if (!student) {
      return res.status(401).json({ error: "Student not found. Please login again." });
    }

    // Attach student details (without password) to request object
    req.student = {
      fullName: student.fullName,
      email: student.email,
      location: student.location,
      university: student.university,
      degree: student.degree,
      gradDate: student.gradDate,
      gpa: student.gpa,
      jobType: student.jobType,
      skills: student.skills,
    };

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ error: "Invalid or expired token. Please login again." });
  }
};


const  isAuthenticated = (req, res, next) => {
  // Allow access to the `/login` route without authentication
 

  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated",redirect:"/studentlogin" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};



module.exports = {authenticateToken,isAuthenticated};
