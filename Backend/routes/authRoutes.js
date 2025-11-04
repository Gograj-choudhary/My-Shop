const express = require('express');
const router = express.Router();

const { verifyToken, refreshToken, googleAuthCallback } = require('../controllers/authController');
const { generalLimiter, refreshLimiter } = require('../middlewares/rateLimiter');
const passport = require('../middlewares/googleAuth');



// Routes
router.post('/verify-token',generalLimiter, verifyToken);
router.post('/refresh-token',refreshLimiter, refreshToken);

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' , session: false}),
  googleAuthCallback
);


module.exports = router;
