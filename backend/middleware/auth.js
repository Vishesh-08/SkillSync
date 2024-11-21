const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; 

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
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
