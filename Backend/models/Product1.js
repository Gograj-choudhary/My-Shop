const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    prize: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Men", "Woman"],
        required: true,

    },
    image: {
        type: String,
        required: true,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,

    },
    adminName: {
        type: String,
    },    


}, {
    timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);
