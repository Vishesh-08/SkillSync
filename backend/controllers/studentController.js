const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Add bcryptjs for password hashing
require('dotenv').config();
const server = process.env.SERVER_URL;
console.log(server);

// Register student
const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      
      phone,
      dob,
      location,
      university,
      degree,
      yearOfStudy,
      gradDate,
      gpa,
      jobPreferences,
      skills,
      certifications,
      portfolio,
      socialLinks,
      password,
    } = req.body;
    const email =req.body.email

    if (!fullName || !email || !phone || !dob || !location || !university || !degree || !gradDate || !gpa || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      profile: {
        fullName,
        image: `${server || 'http://localhost:5000'}/api/students/upload/${req.body.photo || 'default.jpg'}`,
      },email,
      details: {
        
        phone,
        dob,
        location,
        university,
        degree,
        gradDate,
        gpa,
      },
      skills: skills ? JSON.parse(skills) : [],
      certifications: certifications ? JSON.parse(certifications) : [],
      portfolio: portfolio ? JSON.parse(portfolio) : [],
      socialLinks: socialLinks ? JSON.parse(socialLinks) : [],
      jobPreferences: jobPreferences ? JSON.parse(jobPreferences) : [],
      resume: `${server || 'http://localhost:5000'}/api/students/upload/${req.body.resume || 'default.pdf'}`,
      password: hashedPassword,
    });
    

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate email entry" });
    }
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
    if (!student) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ email: student.email, id: student._id, userType: "student" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Format the response
    const studentResponse = {
      profile: {
        fullName: student.profile.fullName,
        image: student.profile.image,
      },
      details: {
        email: student.email,
        phone: student.details.phone,
        dob: student.details.dob,
        location: student.details.location,
        university: student.details.university,
        degree: student.details.degree,
        gradDate: student.details.gradDate,
        gpa: student.details.gpa,
      },
      skills: student.skills,
      certifications: student.certifications || [],
      portfolio: student.portfolio || [],
      socialLinks: student.socialLinks || [],
      jobPreferences: student.jobPreferences || [],
      resume:student.resume
    };

    // Respond with the token and formatted student object
    return res.status(200).json({
      message: "Login successful",
      redirect: "/dashboard",
      user: studentResponse,
      token,
      userType: "student",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

// Student authentication
const studentAuth = async (req, res) => {
  const email = req.user.email;
  const studentRecord = await Student.findOne({ email });

  if (!studentRecord) {
    return res.status(404).json({ error: "Student not found" });
  }

  const studentResponse = {
    profile: {
      fullName: studentRecord.profile.fullName,
      image: `${server || 'http://localhost:5000'}/api/students/upload/${email}.jpg`,
    },
    details: {
      email: studentRecord.details.email,
      phone: studentRecord.details.phone,
      dob: studentRecord.details.dob,
      location: studentRecord.details.location,
      university: studentRecord.details.university,
      degree: studentRecord.details.degree,
      gradDate: studentRecord.details.gradDate,
      gpa: studentRecord.details.gpa,
    },
    skills: studentRecord.skills,
    certifications: studentRecord.certifications || [],
    portfolio: studentRecord.portfolio || [],
    socialLinks: studentRecord.socialLinks || [],
    jobPreferences: studentRecord.jobPreferences || [],
  };

  // Respond with the student object
  return res.status(200).json({ user: { ...studentResponse, userType: "student" } });
};

module.exports = { registerStudent, loginStudent, studentAuth };
