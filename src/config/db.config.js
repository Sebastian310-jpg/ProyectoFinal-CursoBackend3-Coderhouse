import mongoose from "mongoose";
import config from "./env.config.js";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(config.mongoUri);

    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB: ', error);
    throw error;
  }
}

export default connectToMongoDb;