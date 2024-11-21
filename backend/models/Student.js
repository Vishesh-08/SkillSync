const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  dob: { type: Date, required: true },
  location: { type: String, required: true },
  university: { type: String, required: true },
  degree: { type: String, required: true },
  gradDate: { type: Date, required: true },
  gpa: { type: Number, required: true },
  jobType: { type: String, default: "Full-Time" },
  relocate: { type: String, default: "Yes" },
  resume: { type: String }, // Path to the resume file
  skills: { type: [String], default: [] }, // Array of skills
  password: { type: String, required: true },
});

// Password hashing middleware


module.exports = mongoose.model("Student", studentSchema);
