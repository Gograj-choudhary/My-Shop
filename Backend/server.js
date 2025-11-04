const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./middlewares/googleAuth');

require('dotenv').config();

const sequelize = require('./config/db');
const { jwtAuthMiddleware } = require('./middlewares/jwt'); 

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(passport.initialize());

// Routes
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const authRoutes = require('./routes/authRoutes');


  
// Model Sync and Server Start
const { Admin, Customer, Order, Product, Cart, Address} = require('./models');

(async () => {
  try {
    await sequelize.sync({alter: true});
    console.log("Database connected successfully");


app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  }catch(error){
    console.error("Database connection failed", error);
    process.exit(1);
  }

})();


