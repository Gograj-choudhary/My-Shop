const jwt = require('jsonwebtoken');

// Middleware for verifying JWT token
const jwtAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization header is missing or malformed." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

// Function to generate a new access token
const generateAccessToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
};

// Function to generate a refresh token
const generateRefreshToken = (userData) => {
    return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET);
};

// Refresh token endpoint logic
const refreshTokenHandler = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Refresh token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email , roll: decoded.roll });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        console.error('Refresh token error:', err);
        return res.status(403).json({ error: 'Invalid or expired refresh token.' });
    }
};

// Function to verify a token (Reusable)
const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error('Token verification error:', err);
        return null;
    }
};

module.exports = {
    jwtAuthMiddleware,
    generateAccessToken,
    generateRefreshToken,
    refreshTokenHandler,
    verifyAccessToken
};
