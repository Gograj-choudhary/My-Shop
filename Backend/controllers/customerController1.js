const Customer = require('../models/Customer1');
const Product = require('../models/Product1');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const Admin = require('../models/Admin1');


// Customer registration
const registerCustomer = async (req, res) => {
    const { name, password, phone, email } = req.body;

    if (!name || !password || !phone || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
            name,
            password: hashedPassword,
            phone,
            email
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer registered successfully.' });
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Customer login
const loginCustomer = async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ error: 'Phone and password are required.' });
    }

    try {
        const customer = await Customer.findOne({ phone });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }
        const payload =  { id: customer._id, phone: customer.phone };

        const accessToken = generateAccessToken( payload);
        const refreshToken = generateRefreshToken(payload);

        res.status(200).json({
            message: 'Login successful.',
            payload,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error logging in customer:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get all products from all admins (Public - no authentication required)
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('adminId', 'name phone');
        res.status(200).json({
            message: 'All products fetched successfully.',
            products,
            totalProducts: products.length
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Add to Cart 
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user.id; // assuming authentication middleware sets req.user

    if (!productId ) {
      return res.status(400).json({ message: "ProductId or Quantity is missing" });
    }

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find customer
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if product already exists in cart
    const itemIndex = customer.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      customer.cart[itemIndex].quantity += 1;
    } else {
      // Add new product to cart
      customer.cart.push({ productId });
    }

    await customer.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart: customer.cart,
    });

  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reduce from Cart
const reduceToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user.id; // assuming authentication middleware sets req.user

    if (!productId ) {
      return res.status(400).json({ message: "ProductId or Quantity is missing" });
    }

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find customer
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if product already exists in cart
    const itemIndex = customer.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      customer.cart[itemIndex].quantity -= 1;
    }

    await customer.save();

    return res.status(200).json({
      message: "Product Reduced to cart successfully",
      cart: customer.cart,
    });

  } catch (err) {
    console.error("Reduce to Cart Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove Item from Cart 
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user.id; // authentication middleware must set req.user

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find customer
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Find product in cart
    const itemIndex = customer.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Remove product from cart
    customer.cart.splice(itemIndex, 1);

    // Save updated cart
    await customer.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart: customer.cart,
    });

  } catch (err) {
    console.error("Remove from Cart Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// GET /cart
const cartItems = async (req, res) => {
  try {
    const customerId = req.user.id;

    // Find the customer and populate cart.productId with full product details
    const customer = await Customer.findById(customerId).populate("cart.productId");

    if (!customer) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    // Format cart items
    const cartItems = customer.cart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      addedAt: item.addedAt,
      product: item.productId, // populated product details
    }));

    return res.status(200).json({
      message: "Cart items fetched successfully",
      cart: cartItems,
    });
  } catch (err) {
    console.error("Cart fetch error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Order Placement Controller
const placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id; // from JWT
    const { addressIndex, address, paymentMode } = req.body;

    
    const customer = await Customer.findById(customerId).populate("cart.productId");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (!customer.cart || customer.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    
    let selectedAddress;

    if (customer.address.length === 0 && address) {
      selectedAddress = address;
      customer.address.push(address); // save new address
    } else if (addressIndex !== undefined && customer.address[addressIndex]) {
      selectedAddress = customer.address[addressIndex];
    } else if (address) {
      selectedAddress = address;
      customer.address.push(address); // add new address to list
    } else {
      return res.status(400).json({ message: "Invalid or missing address" });
    }

    
    for (const item of customer.cart) {
      const product = item.productId;
      if (!product) continue;

      const admin = await Admin.findById(product.adminId);
      if (!admin) continue;

      const totalPrice = item.quantity * product.prize;

      const orderData = {
        productId: product._id,
        quantity: item.quantity,
        totalPrice,
        adminId: product.adminId,
        paymentMethod: paymentMode || "COD",
        paymentStatus: paymentMode === "Online" ? "Paid" : "Pending",
        deliveryStatus: "Ordered",
        address: selectedAddress,
        orderedAt: new Date(),
      };

      // Add order to both admin and customer
      admin.orders.push({
        ...orderData,
        customerId: customer._id,
      });

      customer.orders.push(orderData);

      await admin.save();
    }

    
    customer.cart = [];
    await customer.save();

    
    return res.status(200).json({
      success: true,
      message: "Order placed successfully and saved to customer & admin records!",
    });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while placing order",
      error: err.message,
    });
  }
};



// Get My Orders
const getMyOrder = async (req, res) => {
  try {
    const customerId = req.user.id;

    // fetch customer and ensure orders exist
    const customer = await Customer.findById(customerId).populate("orders.productId");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Ensure orders array exists
    const orders = customer.orders || [];

    // Map orders to return relevant info
    const formattedOrders = orders.map((order) => ({
      orderId: order.orderId,
      product: order.productId ? {
        name: order.productId.name,
        image: order.productId.image,
        prize: order.productId.prize,
        about: order.productId.about,
      } : null,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      deliveryStatus: order.deliveryStatus,
      address: order.address,
      orderedAt: order.orderedAt,
    }));

    res.status(200).json({
      success: true,
      orders: formattedOrders,
    });
  } catch (err) {
    console.error("Get My Orders Error:", err);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
};




// Get men products from all admins (Public - no authentication required)
const getMenProducts = async (req, res) => {
    try {
        const menProducts = await Product.find({ gender: 'Men' }).populate('adminId', 'name phone');
        res.status(200).json({
            message: 'All men products fetched successfully.',
            products: menProducts,
            totalProducts: menProducts.length
        });
    } catch (error) {
        console.error('Error fetching men products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get women products from all admins (Public - no authentication required)
const getWomenProducts = async (req, res) => {
    try {
        const womenProducts = await Product.find({ gender: 'Woman' }).populate('adminId', 'name phone');
        res.status(200).json({
            message: 'All women products fetched successfully.',
            products: womenProducts,
            totalProducts: womenProducts.length
        });
    } catch (error) {
        console.error('Error fetching women products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get single product details by ID (Public - no authentication required)
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('adminId', 'name phone');
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({
            message: 'Product details fetched successfully.',
            product
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Search products from all admins by name (Public - no authentication required)
const searchProducts = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }

    try {
        const products = await Product.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search
        }).populate('adminId', 'name phone');

        res.status(200).json({
            message: 'Search results from all admins fetched successfully.',
            products,
            totalResults: products.length,
            searchQuery: query
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}



module.exports = {
    registerCustomer,
    loginCustomer,
    getAllProducts,
    addToCart,
    reduceToCart,
    cartItems,
    removeFromCart,
    placeOrder,
    getMyOrder,
    getMenProducts,
    getWomenProducts,
    getProductById,
    searchProducts,
};