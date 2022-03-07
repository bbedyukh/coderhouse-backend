import { Router } from 'express'
import { createCart, addProduct, getProducts, deleteProduct, deleteCart } from '../controllers/cartController.js'
const cartRouter = Router()

cartRouter.post('/', createCart)

cartRouter.post('/:cartId/products/:productId', addProduct)

cartRouter.get('/:cartId/products', getProducts)

cartRouter.delete('/:cartId/products/:productId', deleteProduct)

cartRouter.delete('/:cartId', deleteCart)

export default cartRouter
