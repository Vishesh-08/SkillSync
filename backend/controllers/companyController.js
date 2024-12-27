const Company=require("../models/company");
const jwt = require("jsonwebtoken");
const Student=require("../models/Student")
const {candidateRanked}=require("../helper/candidate_rank")

const cookieParser = require('cookie-parser');
require('dotenv').config();
const companyRegister=async (req, res) => {
    try {
      const {
        companyName,
        companyType,
        foundedYear,
        numberOfEmployees,
        contactPerson,
        email,
        phone,
        address,
        website,
        registrationNumber,
        socialMediaLinks,
        gdprConsent,password
      } = req.body;
  
      if (
        !companyName ||
        !companyType ||
        !foundedYear ||
        !numberOfEmployees ||
        !contactPerson ||
        !email ||
        !phone ||
        !address ||
        !website ||
        !registrationNumber ||
        !gdprConsent||!password
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check for existing company
      const existingCompany = await Company.findOne({ email });
      if (existingCompany) {
        return res.status(400).json({ error: "Company with this email already exists" });
      }
  
      // Create a new company
      const newCompany = new Company({
        companyName,
        companyLogo: req.files["companyLogo"]?.[0]?.path, // Save the file path
        companyType,
        foundedYear,
        numberOfEmployees,
        contactPerson,
        email,
        phone,
        address,password,
        website,
        registrationNumber,
        verificationDocuments: req.files["verificationDocuments"]?.[0]?.path, // Save the file path
        socialMediaLinks,
        gdprConsent: gdprConsent === "true", // Convert string to boolean
      });
  
      await newCompany.save();
      res.status(201).json({ message: "Company registered successfully"});
    } catch (error) {
      console.error("Error registering company:", error);
      res.status(500).json({ error: "Error registering company" });
    }
  }


  const companyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate inputs
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find the company by email
      const newCompany = await Company.findOne({ email,password });
      if (!newCompany) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Compare plain-text password
      if (newCompany.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate a JWT
      const token = jwt.sign(
        { id: newCompany._id, email: newCompany.email, userType: 'company' },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );
  
      // Prepare the company details for frontend
      const userDetails = {
        companyName: newCompany.companyName,
        companyLogo: newCompany.companyLogo, // You can directly use the logo file path or URL from the database
        companyType: newCompany.companyType,
        foundedYear: newCompany.foundedYear,
        numberOfEmployees: newCompany.numberOfEmployees,
        contactPerson: newCompany.contactPerson,
        email: newCompany.email,
        phone: newCompany.phone,
        address: newCompany.address,
        website: newCompany.website,
        registrationNumber: newCompany.registrationNumber,
        verificationDocuments: [
          { name: "Company Registration", url: "/docs/registration.pdf" },  // Use the correct path or URL to documents
          { name: "Tax Certificate", url: "/docs/tax_certificate.pdf" },      // Use the correct path or URL to documents
        ],
        socialMediaLinks: [
          { platform: "LinkedIn", url: newCompany.socialMediaLinks, iconClass: "fa-linkedin", color: "#0077b5" },
          { platform: "Twitter", url: newCompany.socialMediaLinks, iconClass: "fa-twitter", color: "#1DA1F2" },
          { platform: "GitHub", url: newCompany.socialMediaLinks, iconClass: "fa-github", color: "#333" },
        ]
      };
  
      // Set the JWT in an HTTP-only cookie
      res.status(200).json({
        message: "Login successful", // Can be customized for different user types
        user:{ ...userDetails,userType: "company"}, // Send transformed company data
        token,
      });
    } catch (error) {
      res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
  };
  
const companyAuth= async (req,res)=>{
  const email=req.user.email
  
  const newCompany = await Company.findOne({ email });
  const UserDetails = {
    companyName: newCompany.companyName,
    companyLogo: newCompany.companyLogo, // You can directly use the logo file path or URL from the database
    companyType: newCompany.companyType,
    foundedYear: newCompany.foundedYear,
    numberOfEmployees: newCompany.numberOfEmployees,
    contactPerson: newCompany.contactPerson,
    email: newCompany.email,
    phone: newCompany.phone,
    address: newCompany.address,
    website: newCompany.website,
    registrationNumber: newCompany.registrationNumber,
    verificationDocuments: [
      { name: "Company Registration", url: "/docs/registration.pdf" },  // Use the correct path or URL to documents
      { name: "Tax Certificate", url: "/docs/tax_certificate.pdf" },      // Use the correct path or URL to documents
    ],
    socialMediaLinks: [
      { platform: "LinkedIn", url: newCompany.socialMediaLinks, iconClass: "fa-linkedin", color: "#0077b5" },
      { platform: "Twitter", url: newCompany.socialMediaLinks, iconClass: "fa-twitter", color: "#1DA1F2" },
      { platform: "GitHub", url: newCompany.socialMediaLinks, iconClass: "fa-github", color: "#333" },
    ]
  };

  // Respond with the token and formatted student object
  return res
    .status(200)
    .json({user:{...UserDetails,userType: "company"} });

}
const searchCandidate = async (req, res) => {
  const { skills, behaviorWeight = 1, cgpaWeight = 1 } = req.body;

  if (!Array.isArray(skills) || skills.length === 0) {
    return res
      .status(400)
      .json({ message: "Skills array is required and cannot be empty." });
  }

  if (behaviorWeight <= 0 || cgpaWeight <= 0) {
    return res.status(400).json({
      message: "Weights (behaviorWeight and cgpaWeight) must be positive numbers.",
    });
  }

  try {
    // Fetch candidates excluding the password field
    const candidates = await Student.find({ skills: { $in: skills } }).select(
      "-password -otherFields" // Exclude unnecessary fields
    );

    if (candidates.length === 0) {
      return res
        .status(404)
        .json({ message: "No candidates found matching the criteria." });
    }

    // Rank candidates using the custom ranking function
    const rankedCandidates = candidateRanked(
      candidates,
      skills,
      behaviorWeight,
      cgpaWeight
    );

    // Only return the necessary fields
    const filteredCandidates = rankedCandidates.map(candidate => ({
      name: candidate._doc.profile.fullName,
      image: candidate._doc.profile.image,
      resume: candidate._doc.resume,
      gpa: candidate._doc.details.gpa,
      skills: candidate._doc.skills,
      contact: candidate._doc.email,
    }));

    // Send the response
    res.status(200).json({
      data: filteredCandidates,
      count: filteredCandidates.length,
      query: { skills, behaviorWeight, cgpaWeight },
    });
  } catch (err) {
    console.error("Error searching candidates:", err);
    res.status(500).json({
      message: "An error occurred while searching candidates.",
      error: err.message,
    });
  }
};



//TODO:search candidate has to be implement 
//TODO:vacancy count function has to be implement 

  
  
module.exports={companyRegister,companyLogin,companyAuth,searchCandidate};