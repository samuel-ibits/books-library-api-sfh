import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/your-database-name", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // This is deprecated but still supported by Mongoose
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error.message);
  }
};

export { connect, disconnect };
