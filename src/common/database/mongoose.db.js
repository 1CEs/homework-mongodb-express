import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

try {
    mongoose.connect(process.env.MONGODB_CONN)
    console.log('Connected to mongodb.')
} catch(err) {
    console.error('Err:', err)
}

export default mongoose
