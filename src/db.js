import 'dotenv/config'
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('>>> DB is conected')
    } catch (e) {
        console.log(e)
    }
}