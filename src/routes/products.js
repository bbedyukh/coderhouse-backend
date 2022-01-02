import express from 'express'
import uploadService from '../services/uploadService.js'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productsController.js'
import { authMiddleware } from '../utils.js'

const products = express.Router()

products.get('/', getProducts)

products.get('/:id', getProduct)

products.post('/', authMiddleware, uploadService.single('picture'), createProduct)

products.put('/:id', authMiddleware, uploadService.single('picture'), updateProduct)

products.delete('/:id', authMiddleware, deleteProduct)

export default products
