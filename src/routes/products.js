import express from 'express'
import uploadService from '../services/uploadService.js'
// import ProductsFile from '../dao/products/productsFile.js'
import ProductsMongoDB from '../dao/products/productsMongoDB.js'
import { authMiddleware } from '../utils.js'

// const productsService = new ProductsFile()
const productsService = new ProductsMongoDB()

const products = express.Router()

products.get('/', (req, res) => {
  productsService.getProducts()
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

products.get('/:id', (req, res) => {
  const productId = req.params.id
  productsService.getProductById(productId)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

products.post('/', authMiddleware, uploadService.single('picture'), (req, res) => {
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  productsService.createProduct(product)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

products.put('/:id', authMiddleware, (req, res) => {
  const productId = req.params.id
  const product = req.body
  productsService.updateProductById(productId, product)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

products.delete('/:id', authMiddleware, (req, res) => {
  const productId = req.params.id
  productsService.deleteProductById(productId)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

export default products
