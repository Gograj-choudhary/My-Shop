const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const { 
    registerCustomer, 
    loginCustomer, 
    getAllProducts,
    getMenProducts,
    getWomenProducts,
    getProductById,
    searchProducts,
    addToCart,
    cartItems,
    reduceToCart,
    removeFromCart,
    placeOrder,
    getMyOrder,
} = require('../controllers/customerController');
const { loginLimiter, generalLimiter } = require('../middlewares/rateLimiter');
const { aiProductFilter } = require('../controllers/aiController');


// Auth Routes (No authentication required)
router.post('/register', registerCustomer);
router.post('/login', loginLimiter, loginCustomer);



// Product Viewing Routes (Public - No authentication required)
router.use('/products', generalLimiter);

// Protected Routes 
router.post('/products/add-cart', jwtAuthMiddleware, addToCart);
router.post('/products/reduce-cart', jwtAuthMiddleware, reduceToCart);
router.get('/products/get-cart', jwtAuthMiddleware, cartItems);
router.post('/products/remove-from-cart', jwtAuthMiddleware, removeFromCart);
router.post('/products/place-order', jwtAuthMiddleware, placeOrder);
router.get('/products/get-order', jwtAuthMiddleware, getMyOrder);


router.get('/products', getAllProducts);
router.post('/products/ai-filter', aiProductFilter);
// router.get('/products/men', getMenProducts);
// router.get('/products/women', getWomenProducts);
// router.get('/products/search', searchProducts);
router.get('/products/:id', getProductById);




module.exports = router;