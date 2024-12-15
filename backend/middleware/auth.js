const jwt = require("jsonwebtoken");
const { studentAuth } = require("../controllers/studentController");
const { companyAuth } = require("../controllers/companyController");

require("dotenv").config();

const isAuthenticated = (req, res) => {
  // Allow access to the `/login` route without authentication
  const token = req.cookies?.authToken;
  

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
    req.user = decoded; // Attach the decoded user data to the request object
     // Attach userType to the request object

    
    

    if (req.userType === 'company' || decoded.userType==="company") {
      // Call companyAuth and pass control to next if successful
      return companyAuth(req, res); 
    } 
    else if (req.userType == 'student'|| decoded.userType=="student") {
      
      // Call studentAuth and pass control to next if successful
      return studentAuth(req, res);
    }else if (req.userType === '') {
      // Call studentAuth and pass control to next if successful
      return res.json({});
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
    
  } catch (err) {
    
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { isAuthenticated };
