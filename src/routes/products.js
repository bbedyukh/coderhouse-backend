import express from 'express'
import ProductsService from '../services/productsService.js'
import uploadService from '../services/uploadService.js'
import { authMiddleware } from '../utils.js'
import dotenv from 'dotenv'
dotenv.config()

const productsService = new ProductsService()
const products = express.Router()

products.get('/', (req, res) => {
  productsService.getProducts().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  productsService.getProduct(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', authMiddleware, uploadService.single('picture'), (req, res) => {
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  productsService.addProduct(product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.put('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const product = req.body
  productsService.updateProduct(id, product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.delete('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  productsService.deleteProduct(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default products
