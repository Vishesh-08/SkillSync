const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key_for_student";

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; 

    if (!token) {
        res.redirect("/studentlogin");
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.company = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};

module.exports = authenticateToken;
