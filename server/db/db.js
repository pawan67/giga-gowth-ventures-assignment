const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // The following prevents some deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.log("MongoDB connection FAIL");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
