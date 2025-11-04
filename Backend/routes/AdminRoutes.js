const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const { 
    registerAdmin, 
    loginAdmin, 
    addProduct,
    getMyProducts,
    // getMenProducts,
    // getWomenProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/AdminController');
const { generalLimiter, loginLimiter } = require('../middlewares/rateLimiter');

// Auth Routes (No authentication required)
router.post('/register', registerAdmin);
router.post('/login', loginLimiter, loginAdmin);

// Product Routes (Authentication + Rate limit for all)
router.use('/products', generalLimiter, jwtAuthMiddleware);

router.post('/products', addProduct);
router.get('/products/my-products', getMyProducts);
// router.get('/products/men', getMenProducts);
// router.get('/products/women', getWomenProducts);
router.get('/products/:id', getProductById);
router.put('/products/update/:id', updateProduct);
router.delete('/products/delete/:id', deleteProduct);

module.exports = router;
