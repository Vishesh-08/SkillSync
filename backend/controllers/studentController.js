const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Register student
const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dob,
      location,
      university,
      degree,
      yearOfStudy,
      gradDate,
      gpa,
      jobType,
      relocate,
      password,
    } = req.body;

    const skills = JSON.parse(req.body.skills || "[]");

    // Validate all required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !dob ||
      !location ||
      !university ||
      !degree ||
      !gradDate ||
      !gpa ||
      !jobType ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for existing student
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student with this email already exists" });
    }

    // Create a new student with the plain password
    const newStudent = new Student({
      fullName,
      email,
      phone,
      dob,
      location,
      university,
      degree,
      yearOfStudy,
      gradDate,
      gpa,
      jobType,
      relocate,
      resume: `${email}.pdf`,
      skills,
      password, // storing plain password (NOT recommended)
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ error: "Error registering student" });
  }
};

// Login student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student || student.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ email: student.email, id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Format the response
    const studentResponse = {
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      dob: student.dob,
      location: student.location,
      university: student.university,
      degree: student.degree,
      gradDate: student.gradDate,
      gpa: student.gpa,
      jobType: student.jobType,
      relocate: student.relocate,
      resume: student.resume,
      skills: student.skills,
    };

    // Respond with the token and formatted student object
    return res
      .status(200)
      .json({
        message: "Login successful",
        redirect: "/dashboard",
        student: studentResponse,
        token,
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { registerStudent, loginStudent };
