import mongoose from 'mongoose'
import { MONGO } from '../../config/config.js'
import loggerHandler from '../../middlewares/loggerHandler.js'

const logger = loggerHandler()

export const connectMongoDB = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO.URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => logger.info('A connection to MongoDB has been established.'))
      .catch(err => logger.error(err))
  }
}
