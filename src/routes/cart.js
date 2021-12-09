import express from 'express'
import CartsManager from '../classes/cartsManager.js'
const cartsManager = new CartsManager()
const carts = express.Router()

carts.post('/', (req, res) => {
  cartsManager.create().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id', (req, res) => {
  const cartId = Number(req.params.id)
  cartsManager.deleteCartById(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.get('/:id/products', (req, res) => {
  const cartId = Number(req.params.id)
  cartsManager.getProductsByCartId(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.post('/:id/products/:productId', (req, res) => {
  const cartId = Number(req.params.id)
  const productId = Number(req.params.productId)
  cartsManager.addProduct(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id/products/:productId', (req, res) => {
  const cartId = Number(req.params.id)
  const productId = Number(req.params.productId)
  cartsManager.deleteProduct(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default carts
