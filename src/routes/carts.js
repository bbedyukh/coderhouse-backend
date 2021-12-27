import express from 'express'
// import CartsFile from '../dao/carts/cartsFile.js'
import CartsMongoDB from '../dao/carts/cartsMongoDB.js'
// const cartsService = new CartsFile()
const cartsService = new CartsMongoDB()

const carts = express.Router()

carts.post('/', (req, res) => {
  cartsService.createCart().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id', (req, res) => {
  const cartId = req.params.id
  cartsService.deleteCartById(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.get('/:id/products', (req, res) => {
  const cartId = req.params.id
  cartsService.getProductsByCartId(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.post('/:id/products/:productId', (req, res) => {
  const cartId = req.params.id
  const productId = req.params.productId
  cartsService.addProductToCart(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id/products/:productId', (req, res) => {
  const cartId = req.params.id
  const productId = req.params.productId
  cartsService.deleteProductFromCart(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default carts
