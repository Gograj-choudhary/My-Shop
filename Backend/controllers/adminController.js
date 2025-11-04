const {Admin , Product} = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const { generateEmbedding } = require('../utils/embeddingUtils');
const { upsertVectors } = require('../utils/vectorDB');

// Helper function to generate admin ID
const adminIdGenerator = () => {
    const numbers = `0123456789`;
    let adminId = '';
    for(let i=0; i<5; i++){
        adminId += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return adminId;
}

// helper fuction to generate 6 random alphanumeric characters
const productIdGenerator = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let productId = '';
    for (let i=0; i<6 ; i++ ){
        productId += chars.charAt(Math.floor(Math.random()* chars.length));
    }
    return productId;
}


// Admin registration
const registerAdmin = async (req, res) => {
    const { name, password, phone } = req.body;

    if (!name || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // const adminId = adminIdGenerator();
        // console.log("Generated Admin ID:", adminId);

        const newAdmin = await Admin.create({
            name,
            password: hashedPassword,
            phone,
            // adminId,
        });
        
        res.status(201).json({ message: 'Admin registered successfully.' , newAdmin});
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
        const admin = await Admin.findOne({ where: { name } });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }
        // console.log("Admin Id in Login ", admin.adminId)

        const accessToken = generateAccessToken({ id: admin.id, name: admin.name, role: admin.role });
        const refreshToken = generateRefreshToken({ id: admin.id, name: admin.name, role: admin.role });

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
    console.log(" Admin Id", adminId);

    if (!name || !about || !prize || !gender || !image) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!['Men', 'Woman'].includes(gender)) {
        return res.status(400).json({ error: 'Gender must be either "Men" or "Woman".' });
    }
    const productId = productIdGenerator();
    console.log("Generated Product ID:", productId);

    try {
        const newProduct = await Product.create({
            name,
            productId,
            about,
            prize,
            gender,
            image,
            adminId,
            adminName
        });

        const text = `${name}. ${about}. ${prize}, ${gender}`;
        const vector = await generateEmbedding(text);

        await upsertVectors(newProduct.id, vector, newProduct);

        
        res.status(201).json({ 
            success: true,
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
        const products = await Product.findAll({
            where: { adminId } ,
            include: [{ model: Admin, as: 'admin', attributes: ['name']}]
        })
        res.status(200).json({
            message: 'Your products fetched successfully.',
            products
        });
    } catch (error) {
        console.error('Error fetching admin products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


// Get single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id, {
            include: [{ model: Admin, as: 'admin', attributes: ['name']}]
        });

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
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Check if the admin owns this product
        if (product.adminId !== adminId) {
            return res.status(403).json({ error: 'You can only update your own products.' });
        }

        // Validate gender if provided
        if (gender && !['Men', 'Woman'].includes(gender)) {
            return res.status(400).json({ error: 'Gender must be either "Men" or "Woman".' });
        }

        // Update only provided fields
        const updateData = {};
        if (name) updateData.name = name;
        if (about) updateData.about = about;
        if (prize) updateData.prize = prize;
        if (gender) updateData.gender = gender;
        if (image) updateData.image = image;

        await product.update(updateData);

        const updatedProduct = await Product.findByPk(id, {
            include: [{ model: Admin, as: 'admin', attributes: ['name']}]
        })


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
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Check if the admin owns this product
        if (product.adminId !== adminId) {
            return res.status(403).json({ error: 'You can only delete your own products.' });
        }

        await Product.destroy({ where: { id } });

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
    getProductById,
    updateProduct,
    deleteProduct
}