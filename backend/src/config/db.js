const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.DATABASE_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.log("Database Error: missing DATABASE_URI or MONGO_URI in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;