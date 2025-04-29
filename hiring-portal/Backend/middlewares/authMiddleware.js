const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting `Bearer <token>`

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure to set JWT_SECRET in environment
        req.user = decoded; // Attach decoded token data to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
