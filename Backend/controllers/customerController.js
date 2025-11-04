const {Admin , Product, Order, Address, Cart, Customer} = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');


// Helper function to generate customer ID
const customerIdGenerator = ({name, phone }) => {
    const namePart = name.slice(0,4).toUpperCase();
    const phonePart = phone.slice(-4);
    return `${namePart}${phonePart}`;
}

// Customer registration
const registerCustomer = async (req, res) => {
    const { name, password, phone, email } = req.body;

    if (!name || !password || !phone || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // const customerId = customerIdGenerator( {name, phone});
        // console.log("Generated Customer ID:", customerId);

        const newCustomer = await Customer.create({
            name,
            password: hashedPassword,
            phone,
            email,
            // customerId
        });

        res.status(201).json({ message: 'Customer registered successfully.', newCustomer });
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
        const customer = await Customer.findOne({ where : { phone } });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }
        const payload =  { id: customer.id, phone: customer.phone };

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
        const products = await Product.findAll(
            {include: [ { model: Admin, as: 'admin', attributes: ['name', 'phone']}]}
        )

        console.log("Fetched Products:", products.length);
        
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
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find customer
    let customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const existingCartItem = await Cart.findOne({
        where: { customerId, productId}
    });

    if(existingCartItem){
        await existingCartItem.update({
            quantity: existingCartItem.quantity + 1 
        });
    }else {
        await Cart.create({
            customerId,
            productId,
            quantity: 1
        })
    }

    const cart = await Cart.findAll({
        where: { customerId},
        include: [{ model: Product, as: 'product' }]
    })

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart ,
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
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find customer
    let customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const cartItem = await Cart.findOne({
        where: { customerId, productId}
    })

    if(!cartItem){
        return res.status(404).json({ message: "Product not in cart"});
    }

    if(cartItem.quantity > 1){
        await cartItem.update({
            quantity: cartItem.quantity - 1
        })
    }else {
        await cartItem.destroy();
    }

    const cart = await Cart.findAll({
        where: { customerId},
        include: [{ model: Product, as: 'product'}]
    })

    return res.status(200).json({
      message: "Product Reduced to cart successfully",
      cart,
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
        const customerId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: "ProductId is required" });
        }

        // Find product first
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find and delete cart item
        const cartItem = await Cart.findOne({
            where: { customerId, productId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        await cartItem.destroy();

        // Fetch updated cart
        const cart = await Cart.findAll({
            where: { customerId },
            include: [{
                model: Product,
                as: 'product'
            }]
        });

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart
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

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        // Fetch cart items with product details
        const cart = await Cart.findAll({
            where: { customerId },
            include: [{
                model: Product,
                as: 'product'
            }],
            order: [['addedAt', 'DESC']]
        });

        const cartItems = cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            addedAt: item.addedAt,
            product: item.product
        }));

        return res.status(200).json({
            message: "Cart items fetched successfully",
            cart: cartItems
        });
    } catch (err) {
        console.error("Cart fetch error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Order Placement Controller
const placeOrder = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { addressIndex, address, paymentMode } = req.body;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Fetch cart items
        const cartItems = await Cart.findAll({
            where: { customerId },
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: Admin,
                    as: 'admin'
                }]
            }]
        });

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Handle address
        let selectedAddress;
        
        // Fetch existing addresses
        const addresses = await Address.findAll({ where: { customerId } });

        if (addresses.length === 0 && address) {
            // Create new address
            const newAddress = await Address.create({
                customerId,
                ...address
            });
            selectedAddress = address;
        } else if (addressIndex !== undefined && addresses[addressIndex]) {
            selectedAddress = {
                name: addresses[addressIndex].name,
                phone: addresses[addressIndex].phone,
                street: addresses[addressIndex].street,
                city: addresses[addressIndex].city,
                pincode: addresses[addressIndex].pincode
            };
        } else if (address) {
            // Add new address
            await Address.create({
                customerId,
                ...address
            });
            selectedAddress = address;
        } else {
            return res.status(400).json({ message: "Invalid or missing address" });
        }

        // Create orders for each cart item
        for (const item of cartItems) {
            const product = item.product;
            if (!product) continue;

            const totalPrice = item.quantity * product.prize;

            await Order.create({
                customerId: customer.id,
                productId: product.id,
                quantity: item.quantity,
                totalPrice,
                paymentMode: paymentMode || "COD",
                paymentStatus: paymentMode === "Online" ? "Paid" : "Pending",
                deliveryStatus: "Ordered",
                addressName: selectedAddress.name,
                addressPhone: selectedAddress.phone,
                addressStreet: selectedAddress.street,
                addressCity: selectedAddress.city,
                addressPincode: selectedAddress.pincode,
                orderedAt: new Date()
            });
        }

        // Clear cart
        await Cart.destroy({ where: { customerId } });

        return res.status(200).json({
            success: true,
            message: "Order placed successfully!"
        });
    } catch (err) {
        console.error("Order placement error:", err);
        res.status(500).json({
            success: false,
            message: "Server error while placing order",
            error: err.message
        });
    }
};



// Get My Orders
const getMyOrder = async (req, res) => {
    try {
        const customerId = req.user.id;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Fetch orders with product details
        const orders = await Order.findAll({
            where: { customerId },
            include: [{
                model: Product,
                as: 'product'
            }],
            order: [['orderedAt', 'DESC']]
        });

        const formattedOrders = orders.map((order) => ({
            orderId: order.orderId,
            product: order.product ? {
                name: order.product.name,
                image: order.product.image,
                prize: order.product.prize,
                about: order.product.about
            } : null,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
            paymentStatus: order.paymentStatus,
            paymentMode: order.paymentMode,
            deliveryStatus: order.deliveryStatus,
            address: {
                name: order.addressName,
                phone: order.addressPhone,
                street: order.addressStreet,
                city: order.addressCity,
                pincode: order.addressPincode
            },
            orderedAt: order.orderedAt
        }));

        res.status(200).json({
            success: true,
            orders: formattedOrders
        });
    } catch (err) {
        console.error("Get My Orders Error:", err);
        res.status(500).json({ success: false, message: "Server error fetching orders" });
    }
};

// Get single product details by ID (Public - no authentication required)
const getProductById = async (req, res) => {
    const { id } = req.params;
    console.log("Product ID:", id);

    try {
        const product = await Product.findByPk(id, {
            include: [{
                model: Admin,
                as: 'admin',
                attributes: ['name', 'phone']
            }]
        });
        
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
};




module.exports = {
    registerCustomer,
    loginCustomer,
    getAllProducts,
    addToCart,
    reduceToCart,
    removeFromCart,
    cartItems,
    placeOrder,
    getMyOrder,
    getProductById
}