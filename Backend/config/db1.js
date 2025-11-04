const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(' Connected to MongoDB successfully');

        const db = mongoose.connection;

        db.on('disconnected', () => {
            console.warn(' Disconnected from MongoDB');
        });

    } catch (err) {
        console.error(' MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
