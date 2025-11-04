// controllers/aiProductController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require('../models/Product1');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiProductFilter = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ 
                success: false, 
                message: "Query is required" 
            });
        }

        // Step 1: Get all products from database
        const allProducts = await Product.find()
            .populate('adminId', 'name')
            .lean();

        if (allProducts.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "No products found" 
            });
        }

        // Step 2: Prepare product data for AI analysis
        const productsForAI = allProducts.map((product, index) => ({
            id: index,
            _id: product._id.toString(),
            name: product.name,
            about: product.about,
            prize: product.prize,
            gender: product.gender
        }));

        // Step 3: Create AI prompt
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
You are a product filtering assistant. Analyze the user's query and filter the products accordingly.

User Query: "${query}"

Available Products:
${JSON.stringify(productsForAI, null, 2)}

Instructions:
1. Understand the user's requirements (price range, gender, product type, quality indicators like "best", etc.)
2. Filter products that match ALL criteria
3. Sort by relevance (best matches first)
4. Return ONLY a JSON array of product IDs (_id field) that match the query
5. If no products match, return an empty array []
6. Response must be ONLY valid JSON, no explanations or additional text

Example user queries:
- "best t-shirts under 500" → filter t-shirts, price <= 500, sorted by relevance
- "women products under 1000" → filter gender=Woman, price <= 1000
- "cheapest men shirts" → filter shirts for men, sort by lowest price

Return format: ["_id1", "_id2", "_id3"]
`;

        // Step 4: Get AI response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let aiText = response.text().trim();

        // Clean up the response - remove markdown code blocks if present
        aiText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Step 5: Parse AI response
        let filteredProductIds;
        try {
            filteredProductIds = JSON.parse(aiText);
        } catch (parseError) {
            console.error("AI Response parsing error:", parseError);
            console.error("AI Response:", aiText);
            return res.status(500).json({ 
                success: false, 
                message: "Failed to parse AI response",
                error: parseError.message
            });
        }

        // Step 6: Get full product details for filtered IDs
        const filteredProducts = allProducts.filter(product => 
            filteredProductIds.includes(product._id.toString())
        );

        // Step 7: Return results
        return res.status(200).json({
            success: true,
            query: query,
            count: filteredProducts.length,
            products: filteredProducts
        });

    } catch (error) {
        console.error("AI Filter Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error filtering products with AI",
            error: error.message 
        });
    }
};

module.exports = { aiProductFilter };