const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_DEV;
    
    if (!mongoURI) {
      console.error('❌ MongoDB Error: MONGODB_URI or MONGODB_DEV not found in environment variables');
      console.log('💡 Please create a .env file with MONGODB_URI or MONGODB_DEV');
      console.log('💡 For local development, use: MONGODB_DEV=mongodb://localhost:27017/fptu_lostfound');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

