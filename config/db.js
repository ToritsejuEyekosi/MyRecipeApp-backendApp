import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const connectDB = async() => {
    try{
         mongoose.connect("mongodb+srv://Toju:23July200@cluster0.evuzgh8.mongodb.net/test")
        // await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB Sucessfully`);
    }catch(error){
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
};

