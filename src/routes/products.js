import express from 'express'
import ProductsManager from '../classes/productsManager.js'
import uploadService from '../services/uploadService.js'
import { authMiddleware } from '../utils.js'

const productsManager = new ProductsManager()
const products = express.Router()

products.get('/', (req, res) => {
  productsManager.getAll().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  productsManager.getById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', authMiddleware, uploadService.single('picture'), (req, res) => {
  const file = req.file
  const product = req.body
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  productsManager.save(product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.put('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const product = req.body
  productsManager.updateById(id, product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.delete('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  productsManager.deleteById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default products
