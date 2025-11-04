const { Product } = require("../models");
const { generateEmbedding } = require("../utils/embeddingUtils");
const { searchVector } = require("../utils/vectorDB");

const aiProductFilter = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, message: "Query required" });

    // Step 1: Convert user query → embedding
    const queryVector = await generateEmbedding(query);

    // Step 2: Search Pinecone
    const vectorResults = await searchVector(queryVector, 10);

    // Step 3: Get product details from MySQL
    const productIds = vectorResults.map((r) => r.id);
    const products = await Product.findAll({ where: { id: productIds } });

    return res.status(200).json({
      success: true,
      query,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("AI Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Error performing AI search",
      error: error.message,
    });
  }
};

module.exports = { aiProductFilter };
