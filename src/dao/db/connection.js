import mongoose from 'mongoose'
import { MONGO } from '../../config/config.js'

export const connectMongoDB = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO.URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch(err => console.error(err))
  }
}
