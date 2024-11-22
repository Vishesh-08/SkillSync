const Company=require("../models/company");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; 
const cookieParser = require('cookie-parser');
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
        const newCompany = await Company.findOne({ email });
        if (!newCompany) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare plain text passwords
        if (newCompany.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate a JWT
        const token = jwt.sign(
            { id: newCompany._id, email: newCompany.email },
            JWT_SECRET,
            { expiresIn: "1h" } // Token expiration time
        );

        // Set the JWT in an HTTP-only cookie
        

      
        res.cookie("authToken", token, {
          httpOnly: true, // Prevent access from client-side JavaScript
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          maxAge: 3600000, // 1 hour in milliseconds
          sameSite: "strict", // Prevent CSRF attacks
      }).status(201).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

  
  
module.exports={companyRegister,companyLogin};