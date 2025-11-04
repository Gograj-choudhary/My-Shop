const {Pinecone} = require("@pinecone-database/pinecone");
require('dotenv').config();


const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
})

const index = pinecone.index(process.env.PINECONE_INDEX_NAME, process.env.PINECONE_HOST );

async function upsertVectors(id, vector, metadata) {
    if (!vector) return;
    try{
    await index.upsert( [
        {
        id: id.toString(),
        values: vector,
        metadata: {
            name: metadata.name,
            about: metadata.about,
            prize: metadata.prize,
            gender: metadata.gender
        }
        }
]);
console.log(`product ${id} upserted successfully`);

}catch(error){
    console.error("Error upserting vector:", error);
}
}


async function searchVector(vector, topK =10){
    try{
    const result = await index.query({
        vector,
        topK,
        includeMetadata: true,
    });
    return result.matches.map((m) => ({
        id: m.id,
        score: m.score,
        ...m.metadata
    }))
}catch(error){
    console.error("Error searching vector:", error);
    return [];
}
}


module.exports = {
    upsertVectors,
    searchVector
}