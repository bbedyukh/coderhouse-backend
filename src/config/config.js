import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 3000
export const PERSISTENCE = process.env.PERSISTENCE

export const MONGO = {
  URI: process.env.MONGO_URI || ''
}
