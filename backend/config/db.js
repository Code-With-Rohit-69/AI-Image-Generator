import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected ", conn.connection.host);
    } catch (error) {
        console.log("Error in Database connection ", error.message);
        process.exit(1);
    }
}

export default connectDB;