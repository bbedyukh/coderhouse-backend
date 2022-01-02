import express from 'express'
import { createCart, addProduct, getProducts, deleteProduct, deleteCart } from '../controllers/cartsController.js'
const carts = express.Router()

carts.post('/', createCart)

carts.post('/:cartId/products/:productId', addProduct)

carts.get('/:cartId/products', getProducts)

carts.delete('/:cartId/products/:productId', deleteProduct)

carts.delete('/:cartId', deleteCart)

export default carts
