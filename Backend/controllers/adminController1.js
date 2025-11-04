const Admin = require('../models/Admin1');
const Product = require('../models/Product1');
const Customer = require('../models/Customer1');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

// Admin registration
const registerAdmin = async (req, res) => {
    const { name, password, phone } = req.body;

    if (!name || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            password: hashedPassword,
            phone
        });
        

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Admin login
const loginAdmin = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ name });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const accessToken = generateAccessToken({ id: admin._id, name: admin.name, roll: admin.roll });
        const refreshToken = generateRefreshToken({ id: admin._id, name: admin.name, roll: admin.roll });

        res.status(200).json({
            message: 'Login successful.',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Add new product (Admin only)
const addProduct = async (req, res) => {
    const { name, about, prize, gender, image } = req.body;
    const adminId = req.user.id; // from JWT middleware
    const adminName = req.user.name; // from JWT middleware

    if (!name || !about || !prize || !gender || !image) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!['Men', 'Woman'].includes(gender)) {
        return res.status(400).json({ error: 'Gender must be either "Men" or "Woman".' });
    }

    try {
        const newProduct = new Product({
            name,
            about,
            prize,
            gender,
            image,
            adminId,
            adminName
        });

        await newProduct.save();
        res.status(201).json({ 
            message: 'Product added successfully.',
            product: newProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


// Get products by admin (Admin can see only their products)
const getMyProducts = async (req, res) => {
    const adminId = req.user.id;

    try {
        const products = await Product.find({ adminId }).populate('adminId', 'name');
        res.status(200).json({
            message: 'Your products fetched successfully.',
            products
        });
    } catch (error) {
        console.error('Error fetching admin products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get Men products
const getMenProducts = async (req, res) => {
    try {
        const menProducts = await Product.find({ gender: 'Men' }).populate('adminId', 'name');
        res.status(200).json({
            message: 'Men products fetched successfully.',
            products: menProducts
        });
    } catch (error) {
        console.error('Error fetching men products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get Women products
const getWomenProducts = async (req, res) => {
    try {
        const womenProducts = await Product.find({ gender: 'Woman' }).populate('adminId', 'name');
        res.status(200).json({
            message: 'Women products fetched successfully.',
            products: womenProducts
        });
    } catch (error) {
        console.error('Error fetching women products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Get single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('adminId', 'name');
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({
            message: 'Product fetched successfully.',
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Update product (Admin can only update their own products)
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, about, prize, gender, image } = req.body;
    const adminId = req.user.id;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Check if the admin owns this product
        if (product.adminId.toString() !== adminId) {
            return res.status(403).json({ error: 'You can only update your own products.' });
        }

        // Validate gender if provided
        if (gender && !['Men', 'Woman'].includes(gender)) {
            return res.status(400).json({ error: 'Gender must be either "Men" or "Woman".' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(about && { about }),
                ...(prize && { prize }),
                ...(gender && { gender }),
                ...(image && { image })
            },
            { new: true, runValidators: true }
        ).populate('adminId', 'name');

        res.status(200).json({
            message: 'Product updated successfully.',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Delete product (Admin can only delete their own products)
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const adminId = req.user.id;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Check if the admin owns this product
        if (product.adminId.toString() !== adminId) {
            return res.status(403).json({ error: 'You can only delete your own products.' });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Product deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    addProduct,
    getMyProducts,
    getMenProducts,
    getWomenProducts,
    getProductById,
    updateProduct,
    deleteProduct
};