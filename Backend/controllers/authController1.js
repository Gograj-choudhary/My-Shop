const { verifyAccessToken, generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');

// POST /auth/verify-token
const verifyToken = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header is missing or malformed.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        res.status(200).json({ success: true, message: 'Token is valid.', user: decoded });
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// POST /auth/refresh-token
const refreshToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Refresh token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        console.error('Refresh token error:', err);
        res.status(403).json({ error: 'Invalid or expired refresh token.' });
    }
};

// GET /auth/google/callback
const googleAuthCallback = (req, res) => {
    const user = req.user;

    const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
    });

    const refreshToken = generateRefreshToken({
        id: user._id,
        email: user.email,
    });

    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const redirectURL = `${frontendURL}/google-auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}&id=${user._id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
    
    res.redirect(redirectURL);
};



module.exports = {
    verifyToken,
    refreshToken,
    googleAuthCallback,
};
