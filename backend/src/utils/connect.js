const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from backend/.env
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected Successfully');
    } catch (error) {
        console.error('Database disconnection error:', error.message);
    }
};

module.exports = { connectDB, disconnectDB };
