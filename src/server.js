import express from 'express'
import cors from 'cors'
import { __dirname } from './utils.js'
import products from './routes/products.js'
import carts from './routes/carts.js'

const isRoleAdministrator = true
const app = express()

/// ///////////////
/// Middleware ////
/// ///////////////

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(' ')[0], req.method, req.url)
  req.auth = isRoleAdministrator
  next()
})
app.use('/uploads/', express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/public'))

/// ///////////////
///   Routers  ////
/// ///////////////

app.use('/api/products', products)
app.use('/api/cart', carts)

app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} not implemented.`)
  res.status(404).json({ error: -2, descripcion: `Path ${req.path} method ${req.method} not implemented.` })
})

export default app
