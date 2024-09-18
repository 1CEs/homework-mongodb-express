import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

try {
    mongoose.connect(process.env.MONGODB_CONN)
} catch(err) {
    console.error('Err:', err)
}

export default mongoose
