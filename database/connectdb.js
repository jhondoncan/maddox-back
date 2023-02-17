import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB conectada')
} catch (error) {
    console.error(`❌ MongoDB desconectada: ${error.message}`)
    process.exit(1)
}
