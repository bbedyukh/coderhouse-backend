import express from 'express'
import cors from 'cors'
import { PORT } from './config/config.js'
import { __dirname } from './utils.js'
import products from './routes/products.js'
import carts from './routes/cart.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { connectMongoDB } from './dao/db/connection.js'
import loggerHandler from './middlewares/loggerHandler.js'

const logger = loggerHandler()

export default class Server {
  constructor () {
    this.app = express()
    this.port = PORT
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use('/uploads/', express.static(__dirname + '/uploads'))
    this.app.use(express.static(__dirname + '/public'))
    this.app.use(notFoundHandler)
  }

  routes () {
    this.app.use('/api/products', products)
    this.app.use('/api/cart', carts)
  }

  database () {
    connectMongoDB()
  }

  run () {
    this.routes()
    this.middlewares()
    this.database()
    const server = this.app.listen(PORT, () => {
      const message = `| Server listen on port ${PORT} |`
      const link = `| - http://localhost:${PORT}    |`
      console.log('-'.repeat(message.length))
      console.log(message)
      console.log(link)
      console.log('-'.repeat(message.length))
      logger.info(`Server listen on port ${PORT}`)
    })
    server.on('error', err => logger.error(`Error server: ${err}`))
  }
}
