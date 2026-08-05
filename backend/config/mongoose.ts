import mongoose from "mongoose";
import { config } from "./environments.js";

export const connectDB = async () : Promise<void> => {
    try {
        const connect = await mongoose.connect(config.mongoUri);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${(error as Error).message}`);  // Exit process with failure if DB connection fails on startup
        process.exit(1);
    }
}