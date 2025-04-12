import mongoose from "mongoose";

// koppla app till databasen
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ connected to DB`);
};

export default connectDB;
