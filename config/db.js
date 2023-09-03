const mongoose = require('mongoose');

module.exports.connectDB = connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB connect Error : ${error}`);
    process.exit(1);
  }
};