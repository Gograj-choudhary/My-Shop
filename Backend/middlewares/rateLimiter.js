const rateLimit = require("express-rate-limit");

// General limiter (all routes)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, please try again later."
});

// Special limiter for login (sensitive route)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts, try again later."
});

// For token refresh (moderate)
const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many refresh attempts. Try again later."
});


module.exports = {
  generalLimiter,
  loginLimiter,
  refreshLimiter
};
