
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://kelnyokabi:Maidono%4012@cluster0.5ffhcia.mongodb.net/rinz`
        );
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

