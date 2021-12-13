import express from 'express'
import Container from '../classes/Container.js'
import { mariadb } from '../config.js'
import uploadService from '../services/uploadService.js'
import { authMiddleware } from '../utils.js'
import dotenv from 'dotenv'
dotenv.config()

const container = new Container(mariadb, 'products')
const products = express.Router()

products.get('/', (req, res) => {
  container.getProducts().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  container.getProduct(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', authMiddleware, uploadService.single('picture'), (req, res) => {
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  container.saveProduct(product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.put('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const product = req.body
  container.updateProduct(id, product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.delete('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  container.deleteProduct(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default products
