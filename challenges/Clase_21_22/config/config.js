import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV
export const MONGO_URI = process.env.MONGO_URI || ''
