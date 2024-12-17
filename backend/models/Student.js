const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  profile: {
    fullName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },email: {
    type: String,
    required: true,
    
  },
  details: {
    
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    gradDate: {
      type: Date,
      required: true,
    },
    gpa: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
  },
  skills: {
    type: [String], // Array of strings for skills
    default: [],
  },
  certifications: {
    type: [String], // Array of strings for certifications
    default: [],
  },
  portfolio: {
    type: [String], // Array of strings for portfolio links
    default: [],
  },
  socialLinks: [{
    platform: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }],
  jobPreferences: {
    type: [String], // Array of strings for job preferences
    default: [],
  },
  resume: {
    type: String, // Field for the resume (probably a file path or URL)
  },password: {
    type: String, // Add a password field for storing the user's hashed password
    required: true, 
  },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
